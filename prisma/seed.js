const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const cuid = require('cuid');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default services with proper schema
  const services = [
    {
      name: 'Student Admission',
      description: 'General admission inquiries and enrollment',
      estimatedTime: 15,
      isActive: true
    },
    {
      name: 'Student Registration',
      description: 'Course registration and academic enrollment',
      estimatedTime: 12,
      isActive: true
    },
    {
      name: 'Academic Records',
      description: 'Transcripts, certificates, and academic documents',
      estimatedTime: 10,
      isActive: true
    },
    {
      name: 'Financial Aid',
      description: 'Scholarships, loans, and financial assistance',
      estimatedTime: 20,
      isActive: true
    },
    {
      name: 'Counseling',
      description: 'Academic and personal counseling services',
      estimatedTime: 25,
      isActive: true
    },
    {
      name: 'IT Support',
      description: 'Technical support and account issues',
      estimatedTime: 12,
      isActive: true
    }
  ];

  console.log('📋 Creating services...');
  const createdServices = [];
  for (const serviceData of services) {
    const service = await prisma.service.upsert({
      where: { name: serviceData.name },
      update: serviceData, // Update with new data if exists
      create: serviceData
    });
    createdServices.push(service);
    console.log(`✅ Created/Updated service: ${service.name} (ID: ${service.id})`);
  }

  // Create default admin user
  async function main() {
  const email = "admin@schooldb.com";
  const password = "SuperAdmin@123";

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Default Amin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user ensured:", email);
}
  console.log('👤 Created/Found admin user: ADMIN001 / admin123');

  // Create sample students
  const students = [
    {
      studentCode: 'STU001',
      name: 'John Doe',
      course: 'Computer Science',
      year: 2,
      password: 'student123',
      email: "samplestudentemail.@gmail.com"
    },
    {
      studentCode: 'STU002',
      name: 'Jane Smith',
      course: 'Business Administration',
      year: 3,
      password: 'student123',
      email: "samplestudentemail1.@gmail.com"
    },
    {
      studentCode: 'STU003',
      name: 'Mike Johnson',
      course: 'Engineering',
      year: 1,
      password: 'student123',
      email: "samplestudentemail2.@gmail.com"
    },
    {
      studentCode: 'STU004',
      name: 'Sarah Wilson',
      course: 'Mathematics',
      year: 2,
      password: 'student123',
      email: "samplestudentemail3.@gmail.com"
    }
  ];

  console.log('👥 Creating sample students...');
  const createdStudents = [];
  for (const studentData of students) {
    const hashedPassword = await bcrypt.hash(studentData.password, 12);
    const student = await prisma.user.upsert({
      where: { studentCode: studentData.studentCode },
      update: {}, // Don't update if exists to preserve any changes
      create: {
        ...studentData,
        password: hashedPassword,
        role: 'STUDENT'
      }
    });
    createdStudents.push(student);
    console.log(`✅ Created/Found student: ${student.studentCode} / student123`);
  }

  // Create sample tickets to test the queue system
  console.log('🎫 Creating sample tickets...');
  const sampleTickets = [
    {
      userId: createdStudents[0].id, // John Doe
      serviceId: createdServices[0].id, // Student Admission
      status: 'WAITING',
      position: 1
    },
    {
      userId: createdStudents[1].id, // Jane Smith
      serviceId: createdServices[2].id, // Academic Records
      status: 'IN_PROGRESS',
      position: 0
    },
    {
      userId: createdStudents[2].id, // Mike Johnson
      serviceId: createdServices[0].id, // Student Admission
      status: 'WAITING',
      position: 2
    }
  ];

  for (const ticketData of sampleTickets) {
    // Check if ticket already exists for this user
    const existingTicket = await prisma.tickets.findFirst({
      where: {
        userId: ticketData.userId,
        status: {
          in: ['WAITING', 'CALLED', 'IN_PROGRESS']
        }
      }
    });

    if (!existingTicket) {
      const ticket = await prisma.tickets.create({
        data: ticketData,
        include: {
          user: {
            select: {
              studentCode: true,
              name: true
            }
          },
          service: {
            select: {
              name: true
            }
          }
        }
      });
      console.log(`✅ Created ticket: ${ticket.user.studentCode} -> ${ticket.service.name} (${ticket.status})`);
    } else {
      console.log(`⚠️  Ticket already exists for user ID: ${ticketData.userId}`);
    }
  }

  // Create sample activities (keeping your existing structure)
  console.log('📚 Creating sample activities...');
  const activities = [
    {
      title: "Mathematics Assignment 1",
      description: "Complete exercises 1-20 from chapter 3",
      type: "ASSIGNMENT",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      userId: createdStudents[0].id, // Assign to John Doe
      metadata: {
        subject: "Mathematics",
        difficulty: "medium",
        points: 50
      }
    },
    {
      title: "Science Lab Report",
      description: "Lab report on chemical reactions",
      type: "LAB",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      userId: createdStudents[0].id, // Assign to John Doe
      metadata: {
        subject: "Science",
        difficulty: "hard",
        points: 75
      }
    },
    {
      title: "History Quiz - World War II",
      description: "Quiz covering WWII timeline and key events",
      type: "QUIZ",
      status: "COMPLETED",
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      userId: createdStudents[1].id, // Assign to Jane Smith
      metadata: {
        subject: "History",
        difficulty: "easy",
        points: 25
      }
    },
    {
      title: "English Literature Reading",
      description: "Read chapters 5-8 of assigned novel",
      type: "ASSIGNMENT",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      userId: createdStudents[1].id, // Assign to Jane Smith
      metadata: {
        subject: "English",
        difficulty: "medium",
        points: 30
      }
    },
    {
      title: "Computer Programming Project",
      description: "Build a simple web application using Node.js",
      type: "PROJECT",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      userId: createdStudents[2].id, // Assign to Mike Johnson
      metadata: {
        subject: "Computer Science",
        difficulty: "hard",
        points: 100
      }
    },
    {
      title: "Business Strategy Presentation",
      description: "Prepare a 15-minute presentation on market analysis",
      type: "ASSIGNMENT",
      status: "PENDING",
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000), // 17 days from now
      userId: createdStudents[1].id, // Assign to Jane Smith
      metadata: {
        subject: "Business",
        difficulty: "medium",
        points: 60
      }
    },
    {
      title: "Engineering Final Exam",
      description: "Comprehensive exam covering all semester topics",
      type: "EXAM",
      status: "PENDING",
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Same day
      userId: createdStudents[2].id, // Assign to Mike Johnson
      metadata: {
        subject: "Engineering",
        difficulty: "hard",
        points: 200
      }
    },
    {
      title: "Programming Workshop",
      description: "Hands-on workshop on React development",
      type: "WORKSHOP",
      status: "ACTIVE",
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Same day
      userId: null, // No specific user assignment (general activity)
      metadata: {
        subject: "Computer Science",
        difficulty: "medium",
        points: 0,
        maxParticipants: 20
      }
    }
  ];

  for (const activityData of activities) {
    const id = activityData.id || cuid()
    const activity = await prisma.activity.upsert({
      where: { id 
      },
      update: {},
      create: {...activityData, id}
    });
    console.log(`✅ Created/Found activity: ${activity.id}`);
  }


  console.log('🎉 Database seeding completed!');
  console.log('\n📝 Default Login Credentials:');
  console.log('Admin: ADMIN001 / admin123');
  console.log('Students: STU001, STU002, STU003, STU004 / student123');
  console.log('\n📋 Services Created:');
  console.log(`- ${createdServices.length} services with estimated times and active status`);
  console.log('\n🎫 Sample Tickets:');
  console.log('- Test tickets created for queue system testing');
  console.log('\n📚 Sample Activities:');
  console.log('- 8 activities with different types and statuses');
  console.log('- Activities assigned to different students');
  console.log('- Mixed activity types: assignments, labs, quizzes, projects, exams, workshops');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });