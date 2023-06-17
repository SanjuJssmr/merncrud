
import User from '../Models/User.js'


// export const getAllUser = async (req, res) => {
//     try {
//         const users = await User.find()
//         res.json(users)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

export const getAllUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "age";
        let interest = req.query.interest|| "All";

        const interestOptions = [
            "React",
"js",
            "Tailwind",
            "Html5",
            "css",
            "node",
            "python",
            "django"
        ];

       interest === "All"
            ? (interest= [...interestOptions])
            : (interest = req.query.interest.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const users = await User.find({ fullname: { $regex: search, $options: "i" } })
            .where("interest")
            .in([...interest])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await User.countDocuments({
            interest: { $in: [...interest] },
            fullname: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
           interest: interestOptions,
            users,
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

export const getById = (req, res) => {
    res.send(res.users)
}

export const createUser = async (req, res) => {
    const users = new User(req.body)
    try {
        const newUsers = await users.save()
        res.status(201).json(newUsers)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    // if (req.body.fullname != null) {
    // res.users.fullname = req.body.fullname
    // }
    // if (req.body.email != null) {
    //     res.users.email = req.body.email
    // }
    try {
        const updatedUser = await res.users.updateOne({ $set: { fullname: req.body.fullname, email: req.body.email, image: req.body.image, mobile: req.body.mobile, interest: req.body.interest } })
        res.status(200).json(updatedUser)
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

