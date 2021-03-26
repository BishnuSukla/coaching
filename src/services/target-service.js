import { mongoConnect } from "../util/db";

export default class TargetService {
  //Faculty CRUD.

  OnCreateNotification = async notification => {
    try {
      const dbc = await mongoConnect();
      notification.notificationId = Math.random()
        .toString(36)
        .substring(7);
      notification.isDeleted = false;
      notification.createdAt = new Date();
      let { result } = await dbc
        .collection("notifications")
        .insertOne(notification);
      if (result.ok != 1) {
        throw "Error in notification course";
      }
      return {
        status: true,
        message: "Notification has created successfully"
      };
    } catch (ex) {
      console.log(ex);
      console.error("Error in notification course");
      return {
        status: false,
        error: ex
      };
    }
  };
  OnGetNotifications = async () => {
    try {
      const dbc = await mongoConnect();
      let notificationsList = await dbc
        .collection("notifications")
        .find({ isDeleted: false })
        .toArray();
      return {
        status: true,
        message: notificationsList
      };
    } catch (ex) {
      console.error("Error in fetching notifications");
      return {
        status: false,
        error: ex
      };
    }
  };
  OnUpdateNotification = async notification => {
    try {
      const dbc = await mongoConnect();
      let findNotification = await dbc
        .collection("notifications")
        .findOne({ notificationId: notification.notificationId });
      if (!findNotification) {
        throw "Notification not found!!";
      }
      let { result } = await dbc.collection("notifications").updateOne(
        { notificationId: notification.notificationId },
        {
          $set: {
            notification:
              "notification" in notification
                ? notification.notification
                : findNotification.notification,
            description:
              "description" in notification
                ? notification.description
                : findNotification.description
          }
        }
      );
      if (result.ok != 1) {
        throw "Error while updating course details.";
      }
      return {
        status: true,
        message: "course has been updated successfully."
      };
    } catch (ex) {
      console.error("Error in updating course.");
      return {
        status: false,
        error: ex
      };
    }
  };
  OnCreateFaculty = async faculty => {
    try {
      faculty.facultyId = Math.random()
        .toString(36)
        .substring(7);
      faculty.isDeleted = false;
      faculty.createdAt = new Date();
      const dbc = await mongoConnect();
      let { result } = await dbc.collection("faculties").insertOne(faculty);
      if (result.ok !== 1) {
        throw "Error in creating new faculty";
      }
      return {
        status: true,
        message: "Faculty has been created successfully"
      };
    } catch (ex) {
      console.error("Error in creating faculty");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnGetFaculties = async () => {
    try {
      const dbc = await mongoConnect();
      let facultyLists = await dbc
        .collection("faculties")
        .find({ isDeleted: false })
        .toArray();
      return {
        status: true,
        message: facultyLists
      };
    } catch (ex) {
      console.error("Error in fetching faculty Lists");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnUpdateFaculty = async faculty => {
    try {
      const dbc = await mongoConnect();
      let findFaculty = await dbc
        .collection("faculties")
        .findOne({ facultyId: faculty.facultyId });
      if (!findFaculty) {
        throw "Faculty not found!!";
      }
      let { result } = await dbc.collection("faculties").updateOne(
        { facultyId: faculty.facultyId },
        {
          $set: {
            facultyName:
              "facultyName" in faculty
                ? faculty.facultyName
                : findFaculty.facultyName,
            facultyExperience:
              "facultyExperience" in faculty
                ? faculty.facultyExperience
                : findFaculty.facultyExperience,
            facultySubjects:
              "facultySubjects" in faculty
                ? faculty.facultySubjects
                : findFaculty.facultySubjects,

            image: "image" in faculty ? faculty.image : findFaculty.image,
            facultyDescription:
              "facultyDescription" in faculty
                ? faculty.facultyDescription
                : findFaculty.facultyDescription,

            facultyEmail:
              "facultyEmail" in faculty
                ? faculty.facultyEmail
                : findFaculty.facultyEmail,

            facultyMobile:
              "facultyMobile" in faculty
                ? faculty.facultyMobile
                : findFaculty.facultyMobile,

            facultyQualification:
              "facultyQualification" in faculty
                ? faculty.facultyQualification
                : findFaculty.facultyQualification,
            facultyInstitute:
              "facultyInstitute" in faculty
                ? faculty.facultyInstitute
                : findFaculty.facultyInstitute,
            facultyGender:
              "facultyGender" in faculty
                ? faculty.facultyGender
                : findFaculty.facultyGender
          }
        }
      );
      if (result.ok != 1) {
        throw "Error in updating faculty.";
      }
      return {
        status: true,
        message: "Faculty has been updated successfully."
      };
    } catch (ex) {
      console.error("Error while updating faculty details");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnDeleteFaculty = async facultyId => {
    try {
      const dbc = await mongoConnect();
      let findFaculty = await dbc
        .collection("faculties")
        .findOne({ facultyId });
      if (!findFaculty) {
        throw "Faculty not found!!";
      }
      let { result } = await dbc.collection("faculties").updateOne(
        { facultyId: facultyId },
        {
          $set: { isDeleted: true }
        }
      );
      if (result.ok !== 1) {
        throw "Error in deleting faculty.";
      }
      return {
        status: true,
        message: "Faculty has been deleted successfully"
      };
    } catch (ex) {
      console.error("Error in deleting faculty");
      return {
        status: false,
        error: ex
      };
    }
  };
  OnRegister = async register => {
    try {
      const dbc = await mongoConnect();
      register.registrationId = Math.random()
        .toString(36)
        .substring(7);
      register.createdAt = new Date();
      register.prevStatus = "";
      let { result } = await dbc
        .collection("registrations")
        .insertOne(register);
      if (result.ok != 1) {
        throw "Error in registration";
      }
      return {
        status: true,
        message: register.status + "registration successfully."
      };
    } catch (ex) {
      console.log(ex);
      console.error("Error in registration");
      return {
        status: false,
        error: ex
      };
    }
  };
  OnGetRegisteredStudents = async registrationQueryFields => {
    //console.log("registrationQueryFields", typeof registrationQueryFields);
    try {
      registrationQueryFields = JSON.parse(registrationQueryFields);
      const dbc = await mongoConnect();
      let registeredStudentList = await dbc
        .collection("registrations")
        .find({
          status: registrationQueryFields.status,
          type: registrationQueryFields.type
        })
        .sort({ createdAt: -1 })
        .toArray();
      return {
        status: true,
        message: registeredStudentList
      };
    } catch (ex) {
      console.error("Error in fetching registered students");
      return {
        status: false,
        error: ex
      };
    }
  };
  //Course CRUD
  //student reg
  OnUpdateRegistration = async registration => {
    try {
      const dbc = await mongoConnect();
      let findRegistration = await dbc
        .collection("registrations")
        .findOne({ registrationId: registration.registrationId });
      if (!findRegistration) {
        throw "registration not found!!";
      }
      let { result } = await dbc.collection("registrations").updateOne(
        { registrationId: registration.registrationId },
        {
          $set: {
            //prevStatus: findRegistration.status,
            status: registration.undo
              ? findRegistration.prevStatus
              : registration.status,
            prevStatus: registration.undo ? "" : findRegistration.status
            // "status" in registration
            //   ? registration.status
            //   : findRegistration.status
          }
        }
      );
      if (result.ok != 1) {
        throw "Error in updating registration.";
      }
      return {
        status: true,
        message: "Registration has been updated successfully."
      };
    } catch (ex) {
      console.error("Error while updating registration details");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnCreateCourse = async course => {
    try {
      const dbc = await mongoConnect();
      course.courseId = Math.random()
        .toString(36)
        .substring(7);
      course.isDeleted = false;
      course.createdAt = new Date();
      let { result } = await dbc.collection("courses").insertOne(course);
      if (result.ok != 1) {
        throw "Error in creating course";
      }
      return {
        status: true,
        message: "Course has created successfully"
      };
    } catch (ex) {
      console.log(ex);
      console.error("Error in creating course");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnGetCourses = async () => {
    try {
      const dbc = await mongoConnect();
      let courseLists = await dbc
        .collection("courses")
        .find({ isDeleted: false })
        .sort({ _id: -1 })
        .toArray();
      return {
        status: true,
        message: courseLists
      };
    } catch (ex) {
      console.error("Error in fetching courses");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnUpdateCourse = async course => {
    try {
      const dbc = await mongoConnect();
      let findCourse = await dbc
        .collection("courses")
        .findOne({ courseId: course.courseId });
      if (!findCourse) {
        throw "Course not found!!";
      }
      let { result } = await dbc.collection("courses").updateOne(
        { courseId: course.courseId },
        {
          $set: {
            courseName:
              "courseName" in course
                ? course.courseName
                : findCourse.courseName,

            courseFaculties:
              "courseFaculties" in course
                ? course.courseFaculties
                : findCourse.courseFaculties,
            coursePrice:
              "coursePrice" in course
                ? course.coursePrice
                : findCourse.coursePrice,
            coursePriceHomeCoaching:
              "coursePriceHomeCoaching" in course
                ? course.coursePriceHomeCoaching
                : findCourse.coursePriceHomeCoaching,
            courseCategory:
              "courseCategory" in course
                ? course.courseCategory
                : findCourse.courseCategory,
            courseDescription:
              "courseDescription" in course
                ? course.courseDescription
                : findCourse.courseDescription,
            courseStartingClass:
              "courseStartingClass" in course
                ? course.courseStartingClass
                : findCourse.courseStartingClass,
            courseEndingClass:
              "courseEndingClass" in course
                ? course.courseEndingClass
                : findCourse.courseEndingClass
          }
        }
      );
      if (result.ok != 1) {
        throw "Error while updating course details.";
      }
      return {
        status: true,
        message: "course has been updated successfully."
      };
    } catch (ex) {
      console.error("Error in updating course.");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnDeleteCourse = async courseId => {
    try {
      const dbc = await mongoConnect();
      let findCourse = await dbc.collection("courses").findOne({ courseId });
      if (!findCourse) {
        throw "Course not found!!";
      }
      let { result } = await dbc.collection("courses").updateOne(
        { courseId: courseId },
        {
          $set: { isDeleted: true }
        }
      );
      if (result.ok != 1) {
        throw "Error in updating course!!";
      }
      return {
        status: true,
        message: "Course has been deleted successfully"
      };
    } catch (ex) {
      console.error("Error in deleting course");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnUploadImages = () => {
    try {
    } catch (ex) {
      console.error("Error in uplodaing image.");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnDeleteNotification = async notificationId => {
    try {
      const dbc = await mongoConnect();

      let findNotification = await dbc
        .collection("notifications")
        .findOne({ notificationId });

      if (!findNotification) {
        throw "notificationId not found!!";
      }
      let { result } = await dbc.collection("notifications").updateOne(
        { notificationId: notificationId },
        {
          $set: { isDeleted: true }
        }
      );
      if (result.ok != 1) {
        throw "Error in deleting notification!!";
      }
      return {
        status: true,
        message: "Notification has been deleted successfully"
      };
    } catch (ex) {
      console.error("Error in deleting notification");
      return {
        status: false,
        error: ex
      };
    }
  };
}
