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
        throw "Error while updating notification details.";
      }
      return {
        status: true,
        message: "notification has been updated successfully."
      };
    } catch (ex) {
      console.error("Error in updating notification.");
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
            name:
              "name" in faculty
                ? faculty.name
                : findFaculty.name,
            experience:
              "experience" in faculty
                ? faculty.experience
                : findFaculty.experience,
            subjects:
              "subjects" in faculty
                ? faculty.subjects
                : findFaculty.subjects,
            // description:
            //   "description" in faculty
            //     ? faculty.description
            //     : findFaculty.description,

            email:
              "facultyEmail" in faculty
                ? faculty.email
                : findFaculty.email,

            mobile:
              "mobile" in faculty
                ? faculty.mobile
                : findFaculty.mobile

            // qualification:
            //   "qualification" in faculty
            //     ? faculty.qualification
            //     : findFaculty.qualification
            // institute:
            //   "institute" in faculty
            //     ? faculty.institute
            //     : findFaculty.institute
            // gender:
            //   "gender" in faculty
            //     ? faculty.gender
            //     : findFaculty.gender
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
      let { result } = await dbc.collection("faculties").deleteOne(
        { facultyId: facultyId }
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
      register.status = "";
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
  OnGetRegisteredStudents = async (registrationQueryFields) => {
    console.log("registrationQueryFields",registrationQueryFields);
    try {
      const dbc = await mongoConnect();
      let registeredStudentList = await dbc
        .collection("registrations")
        .find({status: registrationQueryFields})
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
            name:
              "name" in registration
                ? registration.name
                : findRegistration.name,
            address:
              "address" in registration
                ? registration.faculty
                : findRegistration.faculty,
            mobile:
              "mobile" in registration
                ? registration.typeOfTution
                : findRegistration.typeOfTution,
            email:
              "email" in registration
                ? registration.topicCovered
                : findRegistration.topicCovered,
            class:
              "class" in registration
                ? registration.category
                : findRegistration.category,
            subjects:
                "subjects" in registration
                  ? registration.class
                  : findRegistration.class,
            status:
                  "status" in registration
                    ? registration.status
                    : findRegistration.status,
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
  OnDeleteRegistration = async registrationId => {
    try {
      const dbc = await mongoConnect();
      let findCourse = await dbc.collection("registrations").findOne({ registrationId });
      if (!findCourse) {
        throw "Registration not found!!";
      }
      let { result } = await dbc.collection("registrations").deleteOne(
        { registrationId: registrationId }
      );
      if (result.ok != 1) {
        throw "Error in deleteing registration!!";
      }
      return {
        status: true,
        message: "Registration has been deleted successfully"
      };
    } catch (ex) {
      console.error("Error in deleting registration");
      return {
        status: false,
        error: ex
      };
    }
  };
  // OnRegister = async course => {
  //   try {
  //     const dbc = await mongoConnect();
  //     course.courseId = Math.random()
  //       .toString(36)
  //       .substring(7);
  //     course.isDeleted = false;
  //     course.createdAt = new Date();
  //     let { result } = await dbc.collection("student").insertOne(course);
  //     if (result.ok != 1) {
  //       throw "Error in Student Register";
  //     }
  //     return {
  //       status: true,
  //       message: "Student Registed successfully"
  //     };
  //   } catch (ex) {
  //     console.log(ex);
  //     console.error("Error in Student Register");
  //     return {
  //       status: false,
  //       error: ex
  //     };
  //   }
  // };
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
            name:
              "name" in course
                ? course.name
                : findCourse.name,
            faculty:
              "faculty" in course
                ? course.faculty
                : findCourse.faculty,
            typeOfTution:
              "typeOfTution" in course
                ? course.typeOfTution
                : findCourse.typeOfTution,
            topicCovered:
              "topicCovered" in course
                ? course.topicCovered
                : findCourse.topicCovered,
            category:
              "category" in course
                ? course.category
                : findCourse.category,
            class:
                "class" in course
                  ? course.class
                  : findCourse.class,
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
      let { result } = await dbc.collection("courses").deleteOne(
        { courseId: courseId }
      );
      if (result.ok != 1) {
        throw "Error in deleting course!!";
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
      let { result } = await dbc.collection("notifications").deleteOne(
        { notificationId: notificationId }
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
  OnCreateAboutus = async about => {
    try {
      const dbc = await mongoConnect();
      about.aboutId = Math.random()
        .toString(36)
        .substring(7);
      about.createdAt = new Date();
      let { result } = await dbc.collection("aboutus").insertOne(about);
      if (result.ok != 1) {
        throw "Error in creating about us";
      }
      return {
        status: true,
        message: "About us has created successfully"
      };
    } catch (ex) {
      console.log(ex);
      console.error("Error in creating about us");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnGetAboutus = async () => {
    try {
      const dbc = await mongoConnect();
      let aboutUs = await dbc
        .collection("aboutus").find({})
        .sort({ _id: -1 })
        .toArray();
      return {
        status: true,
        message: aboutUs
      };
    } catch (ex) {
      console.error("Error in fetching about us");
      return {
        status: false,
        error: ex
      };
    }
  };

  OnUpdateAboutus = async about => {
    try {
      const dbc = await mongoConnect();
      let findAboutus = await dbc
        .collection("aboutus")
        .findOne({ aboutId: about.aboutId });
      if (!findAboutus) {
        throw "About us not found!!";
      }
      let { result } = await dbc.collection("aboutus").updateOne(
        { aboutId: about.aboutId },
        {
          $set: {
            title:
              "title" in about
                ? about.title
                : findAboutus.title,
            description:
                "description" in about
                  ? about.description
                  : findAboutus.description,
            contact:
                "contact" in about
                  ? about.contact
                  : findAboutus.contact
          }
        }
      );
      if (result.ok != 1) {
        throw "Error while updating about us details.";
      }
      return {
        status: true,
        message: "About us has been updated successfully."
      };
    } catch (ex) {
      console.error("Error in updating about us.");
      return {
        status: false,
        error: ex
      };
    }
  };
}
