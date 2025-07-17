import Project from "../schema/Project.schema.js";



// #################################################################################################################################

// Create a new project

export const CreateProject = async (req,res) => {
  try {
    const { name, description, deadline } = req.body;
    const userId = req.user?.userId;

    const project = new Project({
      name,
      description,
      createdBy: userId,
      deadline,
      members: [
        {
          user: userId,
          role: "owner",
        },
      ],
    });

    await project.save();

    res.status(201).json({
      success: true,
      data: await Project.populate(project, {
        path: "createdBy members.user",
        select: "name email",
      }),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// #################################################################################################################################



// Add member to project

export const addMember = async (req,res) =>{
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Authorization check (only owners/managers can add members)
    const requester = project.members.find((m) => m.user.equals(req.user.userId));
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    const { userId, role = "developer" } = req.body;

    // Check if user already exists in project
    if (project.members.some((m) => m.user.equals(userId))) {
      return res.status(400).json({ error: "User already in project" });
    }

    project.members.push({
      user: userId,
      role,
    });
    
    await project.save();

    res.json({
      success: true,
      data: await Project.populate(project, "members.user"),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}




// #################################################################################################################################



// Update project progress

export const updateProjectProgress = async (req,res) =>{
try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const { progress } = req.body;
    if (progress === undefined || isNaN(progress)) {
      return res.status(400).json({ error: "Invalid progress value" });
    }

    project.progress = Math.min(100, Math.max(0, progress));

    // Auto-update status if progress is 100%
    if (project.progress === 100) {
      project.status = "completed";
    }

    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}


// #################################################################################################################################

// Get project details

export const  getProjectDetail = async (req,res) =>{
   try {
    const project = await Project.findById(req.params.projectId)
      .populate("createdBy", "name email")
      .populate("members.user", "name email role");

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}



// #################################################################################################################################

// Update project status

export const updateProjectStatus = async () =>{
try {
    const { status } = req.body;
    const validStatuses = ["active", "completed", "archived"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { status },
      { new: true, runValidators: true }
    );

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}



// #################################################################################################################################

// Get all projects where user is owner or manager

export const getMyProjects = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const projects = await Project.find({
      members: {
        $elemMatch: {
          user: userId,
          role: { $in: ["owner", "manager","developer"] },
        },
      },
    })
      .populate("createdBy", "name email")
      .populate("members.user", "name email");

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};



// #################################################################################################################################


export const getProjectMemberRole = async (req, res) => {
  const userId = req.user?.userId; 
  const projectId = req.params.projectId;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const member = project.members.find((m) => m.user.toString() === userId);

  if (!member) {
    return res.status(403).json({ message: "You are not a member of this project" });
  }

  return res.status(200).json({
    role: member.role,
    userId: member.user,
  });
};