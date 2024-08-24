import faker from "faker";
import fs from "fs";

// Arrays for random data
const workTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Freelancing",
];
const workLocations = [
  "Ahmedabad",
  "Gandhinagar",
  "Pune",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Hyderabad",
];
const workModes = ["Work From Office", "Work From Home", "Remote", "Hybrid"];
const statuses = ["Pending", "Reject", "Interview", "Viewed"];
const uniqueJobTitles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Specialist",
  "Sales Manager",
  "HR Coordinator",
  "Finance Analyst",
  "Operations Manager",
  "Customer Support Specialist",
  "Business Analyst",
  "Project Manager",
  "Graphic Designer",
  "Content Writer",
  "Software Architect",
  "Quality Assurance Tester",
  "Systems Administrator",
  "Network Engineer",
  "DevOps Engineer",
  "Database Administrator",
  "Technical Support Specialist",
];

// Function to generate a single job entry
const generateJob = () => {
  return {
    createdAt: faker.date.past().toISOString(),
    createdBy: {
      $oid: "66af5fabe7b82c93092121410", // Generate a random UUID
    },
    workLocation: faker.random.arrayElement(workLocations),
    workType: faker.random.arrayElement(workTypes),
    status: faker.random.arrayElement(statuses),
    position: faker.random.arrayElement(uniqueJobTitles),
    company: faker.company.companyName(),
    workMode: faker.random.arrayElement(workModes),
  };
};

// Generate an array of 100 jobs
const generateJobs = (num) => {
  return Array.from({ length: num }, generateJob);
};

// Generate data and write to file
const jobs = generateJobs(500);
fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2), "utf8");
console.log("100 job entries generated and saved to jobs.json");
