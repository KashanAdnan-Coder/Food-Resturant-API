import asyncHandler from "express-async-handler"
import foodModel from "../model/food.model.mjs"

const createFood = asyncHandler(async (req, res) => {
    try {
        const food = await foodModel.create({
            ...req.body
        })
        res.status(201).json({
            success: true,
            message: "Food Added!",
            food
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getAllFoods = asyncHandler(async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.status(200).json({
            success: true,
            foods
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getSingleFood = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const food = await foodModel.findById(id)
        res.status(200).json({
            success: true,
            food
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const deleteFood = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await foodModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `${id} deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const updateFood = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const food = await foodModel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            success: true,
            message: "Updated Sucessfully!",
            food
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const addRating = asyncHandler(async (req, res) => {
    try {
        const { rating, comment, foodId } = req.body;
        const review = {
            name: req.user.username,
            rating: Number(rating),
            user: req.user._id.toString(),
            comment,
        }

        const food = await foodModel.findById(foodId);

        const isReviewed = food.reviews.find(
            (rev) => rev.user === req.user._id.toString()
        );

        if (isReviewed) {
            food.reviews.forEach((rev) => {
                console.log(rev.user === req.user._id.toString());

                if (rev.user === req.user._id.toString()) {
                    console.log("andar");

                    rev.rating = rating;
                    rev.comment = comment;
                }
            });
        } else {
            food.reviews.push(review);
            food.numOfReviews = food.reviews.length;
        }
        let avg = 0;
        food.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        food.rating = avg / food.reviews.length;
        await food.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
            message: "Rating added"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getAllReveiws = asyncHandler(async (req, res) => {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
        return res.status(400).json({
            success: false,
            message: "Food Not Found",
        })
    }
    res.status(200).json({
        success: true,
        reviews: food.reviews,
    });
});

const deleteReviews = asyncHandler(async (req, res) => {
    const food = await foodModel.findById(req.query.foodId);
    if (!food) {
        return res.status(400).json({
            success: false,
            message: "Food Not Found",
        })
    }
    const reviews = food.reviews.filter(
        (rev) => {
            rev._id !== req.query.id.toString()
        }
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = (food.rating = avg / food.reviews.length);
    const numOfReviews = reviews.length;
    await foodModel.findByIdAndUpdate(
        req.query.foodId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            userFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
    });
})

export {
    createFood,
    getAllFoods,
    getSingleFood,
    deleteFood,
    updateFood,
    addRating,
    getAllReveiws,
    deleteReviews
}