const express = require('express');
const ClassModel = require('../model/classSchema');
const UserModel = require('../model/userSchema');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Hii from this Side');
});

router.get('/getdata', async (req, res) => {
    const data = await ClassModel.find();
    res.send(data);
});

router.get('/allclasses/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log({ "user id:": user_id });
    const classes = await ClassModel.find({ user: user_id });
    res.send(classes);
});

router.post('/createclass', async (req, res) => {
    const classDetails = req.body;
    const createNewClass = new ClassModel(classDetails);
    const result = await createNewClass.save();
    res.send({ "Class Sucessfully Added :": result });
});

router.post('/updatesectiondecision', async (req, res) => {
    const { class_name, section_wise_division } = req.body;
    const findClass = await ClassModel.findOne({ class_name });
    // findClass.section_wise_division = section_wise_division;
    findClass.class_strength = 10;
    await findClass.save();
    res.send(findClass);
});

router.get('/getclass/:class_id', async (req, res) => {
    const { class_id } = req.params;
    console.log({ "Class is Fetched: ": class_id });
    const findClass = await ClassModel.find({ _id: class_id });
    res.json(findClass);
});

router.get('/getsection/:class_id/:section_id', async (req, res) => {
    const { class_id, section_id } = req.params;
    console.log({ "Section is Fetched: ": section_id });
    res.json({ class_id: class_id, section_id: section_id });
});

router.post('/addstudent/:class_id/:section_id', async (req, res) => {
    const { class_id, section_id } = req.params;
    const { student_name, student_gender, student_rollno, student_dob, student_address, student_marks } = req.body;

    if (student_name == "" || student_gender == "" || student_dob == "" || student_address == "") res.status(403).send({ message: 'Details not Filled Carefully' });

    // if (section_id == undefined) {
    // means class has no section division
    const classFound = await ClassModel.findOne({ _id: class_id });
    if (!classFound) res.status(403).send({ message: 'Class not Found' });

    // const subjects = classFound.subjects;
    // subjects.forEach((subject, index) => {
    //     student_marks.push({ subject_name: subject.subject_name });
    // });
    //     classFound.students.push({
    //         student_name,
    //         student_gender,
    //         student_rollno,
    //         student_dob,
    //         student_address,
    //         student_marks,
    //     });

    //     await classFound.save();
    //     res.json(classFound);
    // }
    // else {
    // const classFound = await ClassModel.findOne({ _id: class_id });
    // if (!classFound) res.status(403).send({ message: 'Class not Found' });

    const section = classFound.sections.find(s => s._id == section_id);

    const subjects = section.section_subjects;
    subjects.forEach((subject, index) => {
        student_marks.push({ subject_name: subject.subject_name });
    });

    section.students.push({
        student_name,
        student_gender,
        student_rollno,
        student_dob,
        student_address,
        student_marks,
    });

    section.section_strength = section.students.length;

    await classFound.save();
    const section_details = classFound.sections.find(s => s._id == section_id);
    const student_details = section_details.students.find(s => s.student_rollno == student_rollno);
    res.json(student_details);
    // }
});
router.post('/addstudent/:class_id', async (req, res) => {
    const { class_id } = req.params;
    const { student_name, student_gender, student_rollno, student_dob, student_address, student_marks } = req.body;

    if (student_name == "" || student_gender == "" || student_dob == "" || student_address == "") res.status(403).send({ message: 'Details not Filled Carefully' });

    // if (section_id == undefined) {
    // means class has no section division
    const classFound = await ClassModel.findOne({ _id: class_id });
    if (!classFound) res.status(403).send({ message: 'Class not Found' });

    const subjects = classFound.subjects;
    subjects.forEach((subject, index) => {
        student_marks.push({ subject_name: subject.subject_name });
    });
    classFound.students.push({
        student_name,
        student_gender,
        student_rollno,
        student_dob,
        student_address,
        student_marks,
    });

    const strength = classFound.students.length;
    classFound.class_strength = strength;

    await classFound.save();
    const student_details = classFound.students.find(s => s.student_rollno == student_rollno);
    res.json(student_details);
    // }
    // else {
    //     const classFound = await ClassModel.findOne({ _id: class_id });
    //     if (!classFound) res.status(403).send({ message: 'Class not Found' });

    //     const section = classFound.sections.find(s => s._id == section_id);
    //     section.students.push(req.body);
    //     await classFound.save();
    //     res.json(classFound);
    // }
});


router.post('/editstudent', async (req, res) => {
    const { section_wise_division, class_id, section_id, student_id, student_details } = req.body;
    console.log(req.body);

    try {
        const student_class = await ClassModel.findOne({ _id: class_id });
        var required_student = undefined;
        if (section_wise_division) {
            const student_section = student_class.sections.find((section) => {
                return section._id == section_id;
            });
            required_student = student_section.students.find((student) => {
                return student._id == student_id;
            });
        }
        else {
            required_student = student_class.students.find((student) => {
                return student._id == student_id;
            });
        }

        required_student.student_marks = student_details.student_marks;
        required_student.student_name = student_details.student_name;
        required_student.student_dob = student_details.student_dob;
        required_student.student_gender = student_details.student_gender;
        required_student.student_address = student_details.student_address;

        await student_class.save();
        res.send({ status: "success" }).status(201);
    } catch (error) {
        res.json({ error_message: error }).status(200);
    }
});

router.post('/signin', async (req, res) => {
    const { school_name, school_logo_url, password, confirm_password, email, username } = req.body;
    //email, username
    try {
        if (!email || !username || !school_name || !school_logo_url || !password || !confirm_password) {
            // throw new Error({ message: "Insufficient Information" });
            res.send({ message: "Insufficient Information" });
            return;
        }
        if (password != confirm_password) {
            // throw new Error("Details Incorrect");
            res.send({ message: "Details Incorrect" });
            return;
        }
        const user = await UserModel.findOne({ email: email });
        console.log(user);
        if (!user) {
            const create_user = new UserModel({
                email,
                username,
                school_name,
                school_logo_url,
                password,
                confirm_password
            });

            const user_creation = await create_user.save();
            res.send({ message: "successful", user_creation });
        }
        else {
            res.send({ message: "User Already Registered" });
        }
    } catch (error) {
        res.json({ error: error });
    }
});

router.post('/login', async (req, res) => {
    const { password, email } = req.body;

    if (!email || !password) {
        res.send({ message: "Information Insufficient" });
        return;
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        res.send({ message: "User Not Registered" });
        return;
    }
    if (password != user.password) {
        res.send({ message: "Invalid Credentials" });
        return;
    }
    const token = await user.generateAuthToken();
    console.log({ token_generated: token });

    res.cookie('tokenname', token, {
        expires: new Date(Date.now() + 25982000000),
        httpOnly: false,
        // sameSite: 'none',
        // secure: true, // Set this if your site is served over HTTPS
        // domain: 'demo-erp-frontend.onrender.com', // Set the appropriate domain
    });

    res.send({ message: "Login Successful", user });
});

const authenticate = async (req, res, next) => {
    // console.log({ req: req });
    // console.log({ cookies: req.cookies });
    try {
        const token_in_cookie = req.cookies.tokenname;
        console.log(token_in_cookie);
        const verify_token = jwt.verify(token_in_cookie, process.env.SECRET_KEY);
        const user = await UserModel.findOne({ _id: verify_token._id, "tokens.token": token_in_cookie });

        if (!user) {
            res.send({ message: "User Not Authenticated" });
            return;
        }

        req.tokenname = token_in_cookie;
        req.user = user;
        req.user_id = user._id;
        next();
    }
    catch (error) {
        res.json({ message: "Unauthorized! OR No Token Generated" });
    }
};

router.get('/getlogin', authenticate, (req, res) => {
    // const object = JSON.stringify(req);
    res.send({ message: "User Authentication Successful", user: req.user });
    // res.send({ req, message: "User Authentication Successful" });
});

router.get('/logout', authenticate, (req, res) => {
    res.clearCookie('tokenname').status(200).send({ message: "logout successful" });
});

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = (router);
