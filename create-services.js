// create-services.js - Run this script to create test services
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createServices() {
  try {
    const services = [
      {
        name: 'Financial Aid',
        description: 'Financial assistance and student aid services',
        estimatedTime: 15,
        isActive: true
      },
      {
        name: 'Student Admission',
        description: 'Student admission and enrollment services',
        estimatedTime: 20,
        isActive: true
      },
      {
        name: 'Academic Records',
        description: 'Transcripts, grades, and academic documentation',
        estimatedTime: 10,
        isActive: true
      },
      {
        name: 'Student Services',
        description: 'General student support and services',
        estimatedTime: 12,
        isActive: true
      }
    ];

    for (const service of services) {
      const existing = await prisma.service.findFirst({
        where: { name: service.name }
      });

      if (!existing) {
        const created = await prisma.service.create({
          data: service
        });
        console.log(`✅ Created service: ${created.name} (ID: ${created.id})`);
      } else {
        console.log(`📋 Service already exists: ${existing.name} (ID: ${existing.id})`);
      }
    }

    // Show all services
    const allServices = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        isActive: true
      }
    });
    console.log('\n📋 All services in database:');
    allServices.forEach(service => {
      console.log(`  - ${service.name} (${service.id}) [${service.isActive ? 'Active' : 'Inactive'}]`);
    });

  } catch (error) {
    console.error('Error creating services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createServices();