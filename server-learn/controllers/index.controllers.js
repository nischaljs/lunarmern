import Student from "../models/Student.model.js";

const AllControllers = {
    GetController: async (req, res) => {
        try {
            console.log("get request received");
            // database fetch 
            const allStudents = await Student.find({});
            res.status(200).json({
                "success": true,
                "message": "data fetched successfully",
                "data": allStudents
            })
        }
        catch (err) {
            res.status(500).json({
                "success": false,
                "message": "server error"
            })
        }
    },
    POSTCONTROLLER: async (req, res) => {
        try {
            console.log("post request received");
            console.log(req.body);
            // database insert
            const insertedStudent = await Student.create(req.body);
            res.status(201).json({
                "success": true,
                "message": "data inserted successfully",
                "data": insertedStudent
            })
        }
        catch (err) {
            res.status(500).json({
                "success": false,
                "message": "server error"
            })
        }
    },
    DELETEUSER: (req, res) => {
        try {
            console.log("delete request received");
            console.log(req.body);
            // database delete 
            res.status(200).json({
                "success": true,
                "message": "data deleted successfully"
            })
        }
        catch (err) {
            res.status(500).json({
                "success": false,
                "message": "server error"
            })
        }
    }
}


export default AllControllers;

