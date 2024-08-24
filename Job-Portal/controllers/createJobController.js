import moment from "moment";
import jobsModel from "../models/jobsModel.js";
import jobModel from "../models/jobsModel.js";
import mongoose from "mongoose";
export const createJobController = async (req, res, next) => {
  const { company, posistion, status, workType, workLocation, String } =
    req.body;

  if (!company || !posistion) {
    next("Please Provide Required Feild");
  }

  req.body.createdBy = req.user.UserId;
  const createdBy = req.user.userId;
  const createJob = await jobModel.create({
    company,
    posistion,
    status,
    workType,
    workLocation,
    String,
    createdBy,
  });
  res.status(200).send({
    message: "Job Created SuccessFully",
    success: true,
    createJob,
  });
};

export const getAllJobsController = async (req, res, next) => {
  console.log(req.user.userId);
  const userJobs = await jobModel.find({ createdBy: req.user.userId });
  res.status(200).send({
    totalJobs: userJobs.length,
    success: true,
    userJobs,
  });
};

export const updateJobController = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next("Invalid ObjectId format Check ID");
  }

  const { company, posistion, status, workType, workLocation, workMode } =
    req.body;

  if (!company || !posistion) {
    next("Please Provide Required Feild");
  }

  const existingUser = await jobModel.findOne({ _id: id });
  if (!existingUser) {
    return next(`No Job Find With This ID ${id}`);
  }

  if (req.user.userId !== existingUser.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }

  const updateJOb = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).send({
    message: "Job Updated SuccessFully",
    success: true,
    updateJOb,
  });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next("Invalid ObjectId format Check ID");
  }

  const existingUser = await jobModel.findOne({ _id: id });
  if (!existingUser) {
    return next(`No Job ID Available With this id ${id} to Delete`);
  }

  if (req.user.userId !== existingUser.createdBy.toString()) {
    next("You are not authorized to Delete this Job");
    return;
  }

  const deleteJob = await jobModel.deleteOne({ _id: id });
  res.status(200).send({
    message: "Job Deleted SuccessFully",
    success: true,
    deleteJob,
  });
};

// Jobs Stats and Filters by their Token
export const alljobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
  ]);
  res.status(200).send({
    message: "Filter Created SuccessFully",
    totalLengh: stats.length,
    success: true,
    stats,
  });
};

// Filter by status
export const statusjobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    // Aggregationby Status Group
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Status wise aggrigation
  const defaultStats = {
    Reject: 0,
    Pending: 0,
    Interview: 0,
    Viewed: 0,
  };

  // Map the stats array to the defaultStats object
  stats.forEach((stat) => {
    const status = stat._id;
    const count = stat.count;
    defaultStats[status] = count;
  });

  // Year and Month Wise Aggrigation
  const yearAndMonthlyStats = await jobsModel.aggregate([
    // Filter by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
        createdAt: { $type: "date" }, // Ensuring createdAt is a date
      },
    },
    // Group by year and month
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const yearAndMonthlyStatsV1 = yearAndMonthlyStats.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    const date = moment()
      .month(month - 1)
      .year(year)
      .format("MMM y");
    return { date, count };
  });

  res.status(200).send({
    message: "Filter Created SuccessFully",
    statusJobs: stats.length,
    success: true,
    defaultStats,
    // stats,
    yearAndMonthlyStats,
    yearAndMonthlyStatsV1,
  });
};
