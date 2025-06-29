// test-db.js
const database = require("./src/utils/database"); // Adjust path as needed

async function testDatabase() {
  console.log("🔍 Testing database connection...\n");

  try {
    // Test 1: Health Check
    console.log("1. Health Check...");
    const isHealthy = await database.healthCheck();
    console.log(
      `   ✅ Health Status: ${isHealthy ? "HEALTHY" : "UNHEALTHY"}\n`
    );

    if (!isHealthy) {
      console.log("❌ Database is not healthy. Stopping tests.");
      return;
    }

    // Test 2: Pool Status
    console.log("2. Connection Pool Status...");
    const poolStatus = database.getPoolStatus();
    console.log(`   📊 Total Connections: ${poolStatus.totalCount}`);
    console.log(`   💤 Idle Connections: ${poolStatus.idleCount}`);
    console.log(`   ⏳ Waiting Connections: ${poolStatus.waitingCount}\n`);

    // Test 3: Basic Query
    console.log("3. Basic Query Test...");
    const result = await database.query(
      "SELECT NOW() as current_time, version() as pg_version"
    );
    console.log(`   🕐 Current Time: ${result.rows[0].current_time}`);
    console.log(
      `   🗄️  PostgreSQL Version: ${result.rows[0].pg_version.split(" ")[0]} ${
        result.rows[0].pg_version.split(" ")[1]
      }\n`
    );

    // Test 4: Check if tables exist
    console.log("4. Checking Tables...");
    const tables = await database.all(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    if (tables.length > 0) {
      console.log("   📋 Existing Tables:");
      tables.forEach((table) => {
        console.log(`      - ${table.table_name}`);
      });
    } else {
      console.log("   ⚠️  No tables found");
    }
    console.log();

    // Test 5: Count records in each table
    console.log("5. Record Counts...");
    const tableNames = ["users", "admins", "services", "tickets"];

    for (const tableName of tableNames) {
      try {
        const count = await database.get(
          `SELECT COUNT(*) as count FROM ${tableName}`
        );
        console.log(`   📊 ${tableName}: ${count.count} records`);
      } catch (error) {
        console.log(
          `   ❌ ${tableName}: Table doesn't exist or error occurred`
        );
      }
    }
    console.log();

    // Test 6: Database Statistics
    console.log("6. Database Statistics...");
    const stats = await database.getStats();
    if (stats) {
      console.log(`   👥 Total Users: ${stats.users?.total_users || 0}`);
      console.log(`   👨‍💼 Total Admins: ${stats.admins?.total_admins || 0}`);
      console.log(
        `   🛠️  Total Services: ${stats.services?.total_services || 0}`
      );
      console.log(`   🎫 Total Tickets: ${stats.tickets?.total_tickets || 0}`);
    } else {
      console.log("   ⚠️  Could not retrieve statistics");
    }
    console.log();

    // Test 7: Transaction Test
    console.log("7. Transaction Test...");
    try {
      const transactionResults = await database.transaction([
        { sql: "SELECT 1 as test1", params: [] },
        { sql: "SELECT 2 as test2", params: [] },
      ]);
      console.log(`   ✅ Transaction completed successfully`);
      console.log(
        `   📊 Results: ${transactionResults.length} queries executed`
      );
    } catch (error) {
      console.log(`   ❌ Transaction failed: ${error.message}`);
    }
    console.log();

    console.log("🎉 Database tests completed successfully!");
  } catch (error) {
    console.error("❌ Database test failed:", error.message);
    console.error("Full error:", error);
  } finally {
    // Don't close the database connection here as it might be used elsewhere
    console.log("\n📝 Test completed. Database connection remains open.");
  }
}

// Run the test
testDatabase().catch(console.error);
