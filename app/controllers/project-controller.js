const { validationResult } = require("express-validator");
const { ProjectModel } = require("../models/project-model");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, privateProject, description , tags} = req.body;
      const owner = req.user;
      const checkExist = await ProjectModel.findOne({
        owner: owner._id,
        title,
      });

      if (!checkExist) {
        const resultValidate = validationResult(req);
        if (resultValidate.errors.length > 0) {
          res.status(401).json({
            status: 401,
            data: null,
            errors: resultValidate,
          });
        } else {
          const result = await ProjectModel.create({
            title,
            description,
            privateProject,
            tags,
            owner: owner._id,
          });
          if (!result) throw { status: 400, message: "faild to create user" };
          return res.status(201).json({
            status: 201,
            success: true,
            message: "project created",
            user: result,
          });
        }
      } else {
        throw {
          status: 400,
          message: "project with this title alrady exist",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  async uploadProjectProfile(req, res, next) {
    try {
      const owner = req.user;
      const projectID = req.params.id;
      const resultValidate = validationResult(req);
      if (resultValidate.errors.length > 0) {
        res.status(401).json({
          status: 401,
          data: null,
          errors: resultValidate,
        });
      } else {
        const result = await ProjectModel.updateOne({
          owner: owner._id,
          _id: projectID,
        });
        if (!result)
          throw { status: 400, message: "project with this id not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const result = await ProjectModel.find({});
      res.status(200).json({
        status: 200,
        message: "All Projects",
        deta: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllProjectByTeam(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllProjectByUser(req, res, next) {
    try {
      const projectOwner = req.user;
      const result = await ProjectModel.find({ owner: projectOwner });
      res.status(200).json({
        status: 200,
        message: "all user projects",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const owner = req.user;
      const ID = req.params.id;
      const result = await ProjectModel.findOne({ owner: owner._id, _id: ID });
      if (!result)
        throw { status: 400, message: "project with this ID not found" };

      const { title, description, privateProject } = req.body;
      if (title || description || privateProject) {
        if(title == result.title) throw {status : 400 , message : "this title already exist"}
        ProjectModel.updateOne(
          { _id: ID },
          { title, description, privateProject },
          (err, data) => {
            if (err) throw { status: 500, message: "cannot update project" };
            res.status(200).json({
              status: 200,
              message: "project updated",
            });
          }
        );
      } else {
        throw { status: 400, message: "please update at least one field" };
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const owner = req.user
      const ID = req.params.id
      const deletedProject = await ProjectModel.findByIdAndDelete(ID)
      if(!deletedProject) throw {status : 400, message : "project with this id not found"}
      res.status(200).json({
        status : 200,
        message : "project deleted",
        deletedProject
      })
    } catch (error) {
      next(error);
    }
  }

  async getProjectById (req , res , next) {
    const ID = req.params.id
    const result = await ProjectModel.findById(ID)
    if(!result) throw {status : 400 , message : "project with this id not found"}
    res.status(200).json({
      status : 200,
      message : "project with ID",
      project : result
    })
  }
}

module.exports = {
  ProjectController: new ProjectController(),
};
