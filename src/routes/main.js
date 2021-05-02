import {} from "dotenv/config";
import express from "express";
import TargetUser from "../services/target-user";
import TargetService from "../services/target-service";
import { isValidateToken } from "../util/token";
import path from "path";

const router = express.Router();
const user = new TargetUser();
const targetService = new TargetService();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Target100 API System."
  });
});

router.post("/createAdmin",async (req, res) => {
  try {
    let { username, password } = req.body;
    let loggedInUser = await user.OnCreateAdmin(username, password);
    if (!loggedInUser.status) {
      throw loggedInUser.error;
    }
    res.status(200).json({
      success: true,
      message: "Admin creation Successful!!",
      data: loggedInUser.token
    });
  } catch (ex) {
    res.status(401).json({
      success: false,
      message: "Error in creation",
      error: ex
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let loggedInUser = await user.OnLoginUser(username, password);
    if (!loggedInUser.status) {
      throw loggedInUser.error;
    }
    res.status(200).json({
      success: true,
      message: "Login Successful!!",
      data: loggedInUser.token
    });
  } catch (ex) {
    res.status(401).json({
      success: false,
      message: "Error in login",
      error: ex
    });
  }
});

router.put("/create-faculty", isValidateToken(), async (req, res) => {
  try {
    let { faculty } = req.body;
    let createFaculty = await targetService.OnCreateFaculty(faculty);
    if (!createFaculty.status) {
      throw createFaculty.error;
    }
    res.status(200).json({
      success: true,
      message: "Faculty has been created successfully!!",
      data: createFaculty.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in creating faculty",
      error: ex
    });
  }
});

router.get("/get-faculties", async (req, res) => {
  try {
    let fetchFaculties = await targetService.OnGetFaculties();
    if (!fetchFaculties.status) {
      throw fetchFaculties.error;
    }
    res.status(200).json({
      success: true,
      message: "Lists of faculties found",
      data: fetchFaculties.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching faculties lists",
      error: ex
    });
  }
});

router.patch("/update-faculty", isValidateToken(), async (req, res) => {
  try {
    let { faculty } = req.body;
    let updateFaculty = await targetService.OnUpdateFaculty(faculty);
    if (!updateFaculty.status) {
      throw updateFaculty.error;
    }
    res.status(200).json({
      success: true,
      message: "Faculty has been updated successfully!!",
      data: updateFaculty.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating faculty",
      error: ex
    });
  }
});

router.delete("/delete-faculty", isValidateToken(), async (req, res) => {
  try {
    let { facultyId } = req.body;
    let deleteFaculty = await targetService.OnDeleteFaculty(facultyId);
    if (!deleteFaculty.status) {
      throw deleteFaculty.error;
    }
    res.status(200).json({
      success: true,
      message: "Faculty has been deleted successfully!!",
      data: deleteFaculty.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in deleting faculty",
      error: ex
    });
  }
});

router.post("/registration", async (req, res) => {
  try {
    let { register } = req.body;
    let registerStudent = await targetService.OnRegister(register);
    if (!registerStudent.status) {
      throw registerStudent.error;
    }
    res.status(200).json({
      success: true,
      message: "Successfully registered",
      data: registerStudent.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Oops something went wrong!",
      error: ex
    });
  }
});

router.get("/get-registrations", isValidateToken(), async (req, res) => {
  try {
    let { status } = req.query;
    let fetchStudents = await targetService.OnGetRegisteredStudents(status);
    if (!fetchStudents.status) {
      throw fetchStudents.error;
    }
    res.status(200).json({
      success: true,
      message: "List of registrations !",
      data: fetchStudents.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching registrations !",
      error: ex
    });
  }
});

router.patch("/update-registration", isValidateToken(), async (req, res) => {
  try {
    let { registration } = req.body;
    let updateRegistration = await targetService.OnUpdateRegistration(
      registration
    );
    if (!updateRegistration.status) {
      throw updateRegistration.error;
    }
    res.status(200).json({
      success: true,
      message: "Registration has been updated successfully!!",
      data: updateRegistration.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating Registration",
      error: ex
    });
  }
});

router.delete("/delete-registration", isValidateToken(), async (req, res) => {
  try {
    let { registrationId } = req.body;
    let deleteRegistration = await targetService.OnDeleteRegistration(
      registrationId
    );
    if (!deleteRegistration.status) {
      throw deleteRegistration.error;
    }
    res.status(200).json({
      success: true,
      message: "Registration has been deleted successfully!!",
      data: deleteRegistration.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in deleting registration",
      error: ex
    });
  }
});


router.get("/get-courses", async (req, res) => {
  try {
    let fetchCourses = await targetService.OnGetCourses();
    if (!fetchCourses.status) {
      throw fetchCourses.error;
    }
    res.status(200).json({
      success: true,
      message: "List of courses found!!",
      data: fetchCourses.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching courses!!",
      error: ex
    });
  }
});
router.put("/create-course", isValidateToken(), async (req, res) => {
  try {
    let { course } = req.body;
    let createCourse = await targetService.OnCreateCourse(course);
    if (!createCourse.status) {
      throw createCourse.error;
    }
    res.status(200).json({
      success: true,
      message: "Course has been created successfully",
      data: createCourse.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in creating course!!",
      error: ex
    });
  }
});

// router.get("/get-courses", isValidateToken(), async (req, res) => {
//   try {
//     let fetchCourses = await targetService.OnGetCourses();
//     if (!fetchCourses.status) {
//       throw fetchCourses.error;
//     }
//     res.status(200).json({
//       success: true,
//       message: "List of courses found!!",
//       data: fetchCourses.message
//     });
//   } catch (ex) {
//     res.status(400).json({
//       success: false,
//       message: "Error in fetching courses!!",
//       error: ex
//     });
//   }
// });

router.patch("/update-course", isValidateToken(), async (req, res) => {
  try {
    let { course } = req.body;
    let updateCourse = await targetService.OnUpdateCourse(course);
    if (!updateCourse.status) {
      throw updateCourse.error;
    }
    res.status(200).json({
      success: true,
      message: "Course has been updated successfully!!",
      data: updateCourse.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating course",
      error: ex
    });
  }
});

router.delete("/delete-course", isValidateToken(), async (req, res) => {
  try {
    let { courseId } = req.body;
    let deleteCourse = await targetService.OnDeleteCourse(courseId);
    if (!deleteCourse.status) {
      throw deleteCourse.error;
    }
    res.status(200).json({
      success: true,
      message: "Course has been deleted successfully!!",
      data: deleteCourse.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in deleting course",
      error: ex
    });
  }
});



router.get("/uploaded-image", (req, res) => {
  try {
    let { category, imageName } = req.query;
    res.sendFile(
      path.join(__dirname, `../../public/${category}/images/${imageName}`)
    );
  } catch (ex) {
    res.status(400).json({
      success: false,
      messgae: "No file found.",
      error: ex
    });
  }
});

router.put("/create-notification", isValidateToken(), async (req, res) => {
  try {
    let { notification } = req.body;
    let createNotification = await targetService.OnCreateNotification(
      notification
    );
    if (!createNotification.status) {
      throw createNotification.error;
    }
    res.status(200).json({
      success: true,
      message: "Notification has been created successfully",
      data: createNotification.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in creating Notification!!",
      error: ex
    });
  }
});

router.get("/get-notifications", async (req, res) => {
  try {
    let fetchNotifications = await targetService.OnGetNotifications();
    if (!fetchNotifications.status) {
      throw fetchNotifications.error;
    }
    res.status(200).json({
      success: true,
      message: "List of Notifications found !!",
      data: fetchNotifications.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching notifications !!",
      error: ex
    });
  }
});

router.patch("/update-notification", isValidateToken(), async (req, res) => {
  try {
    let { notification } = req.body;
    let updateNotification = await targetService.OnUpdateNotification(
      notification
    );
    if (!updateNotification.status) {
      throw updateNotification.error;
    }
    res.status(200).json({
      success: true,
      message: "Notification has been updated successfully!!",
      data: updateNotification.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating notification",
      error: ex
    });
  }
});
router.patch("/update-student", isValidateToken(), async (req, res) => {
  try {
    let { student } = req.body;
    let updateStudent = await targetService.OnVerifyStudent(student);
    if (!updateStudent.status) {
      throw updateStudent.error;
    }
    res.status(200).json({
      success: true,
      message: "student has been updated successfully!!",
      data: updateStudent.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating student",
      error: ex
    });
  }
});

router.delete("/delete-notification", isValidateToken(), async (req, res) => {
  try {
    let { notificationId } = req.body;
    let deleteNotification = await targetService.OnDeleteNotification(
      notificationId
    );
    if (!deleteNotification.status) {
      throw deleteNotification.error;
    }
    res.status(200).json({
      success: true,
      message: "Notification has been deleted successfully!!",
      data: deleteNotification.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in deleting notification",
      error: ex
    });
  }
});
router.put("/create-aboutus", isValidateToken(), async (req, res) => {
  try {
    let { aboutus } = req.body;
    let createAboutUs = await targetService.OnCreateAboutus(
      aboutus
    );
    if (!createAboutUs.status) {
      throw createAboutUs.error;
    }
    res.status(200).json({
      success: true,
      message: "About us has been created successfully",
      data: createAboutUs.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in creating ABout us!!",
      error: ex
    });
  }
});

router.get("/get-aboutus", async (req, res) => {
  try {
    let fetchAboutus = await targetService.OnGetAboutus();
    if (!fetchAboutus.status) {
      throw fetchAboutus.error;
    }
    res.status(200).json({
      success: true,
      message: "List of about us found !!",
      data: fetchAboutus.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching about us !!",
      error: ex
    });
  }
});

router.patch("/update-aboutus", isValidateToken(), async (req, res) => {
  try {
    let { aboutus } = req.body;
    let updateAboutus = await targetService.OnUpdateAboutus(
      aboutus
    );
    if (!updateAboutus.status) {
      throw updateAboutus.error;
    }
    res.status(200).json({
      success: true,
      message: "About us has been updated successfully!!",
      data: updateAboutus.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating about us",
      error: ex
    });
  }
});

export default router;
