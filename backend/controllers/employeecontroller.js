const db = require("../config/db");

const insertemployeedetail = async (req, res) => {
  const { name, age, email, phone, emp_id, emp_dept, emp_doj, emp_role } = req.body;
  console.log("Request Body:", req.body);

 if (!name || !age || !email || !phone || !emp_id || !emp_dept || !emp_doj || !emp_role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const query = `INSERT INTO employee_details (name, age, email, phone, emp_id, emp_dept, emp_doj, emp_role ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    db.query(query, [name, age, email, phone, emp_id, emp_dept, emp_doj, emp_role], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({
          success: false,
          message: "Error occurred while inserting employee details.",
          error: err.message,
        });
      }
      console.log("Insert Result:", result);
      res.status(200).json({
        success: true,
        message: "Employee details inserted successfully.",
        result,
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({
      success: false,
      message: "Unexpected error occurred.",
      error: error.message,
    });
  }
};

const retrieveEmployeeDetails = async (req,res) => {
  try {
    const data = await db.query("SELECT * FROM employee_details");
    if(!data){
      return res.status(404).send({
        success:false,
        message:"no records",
      });
    }
    res.status(200).send({
      success:true,
      message:"data retrived successfully",
      data:data[0]
    })    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      msessage:'error in get data',
      error
    });
    
  }
  
};

module.exports = { insertemployeedetail,retrieveEmployeeDetails};