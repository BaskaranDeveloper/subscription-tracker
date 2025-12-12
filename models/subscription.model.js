// models/Subscription.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },

    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"],
    },

    currency: {
        type: String,
        required: [true, "Subscription currency is required"],
        enum: ["INR", "USD", "GBP"],
        default: "INR",
    },

    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        required: true,
        default: "monthly",
    },

    category: {
        type: String,
        enum: ["scientific", "political", "sports", "technologies", "others"],
        required: true,
        trim: true,
    },

    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },

    status: {
        type: String,
        enum: ["active", "canceled", "expired"], // include 'expired' since hook may set it
        default: "active",
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // startDate must be past or present
                return value <= new Date();
            },
            message: "Start date must be a valid past or present date",
        },
    },

    renewalDate: {
        type: Date,
        required: false, // make optional so pre('save') can auto-calc
        validate: {
            validator: function (value) {
                // if renewalDate not provided or startDate not set, skip validation here
                if (!value || !this.startDate) return true;
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date",
        },
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, { timestamps: true });

// Auto-calculate renewal date before saving if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        const days = renewalPeriods[this.frequency] ?? 30;
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + days);
    }

    // Auto-update the status if renewal date has passed (don't override canceled)
    if (this.status !== "canceled" && this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
