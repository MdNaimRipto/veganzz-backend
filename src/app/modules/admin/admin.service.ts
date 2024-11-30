import { Orders } from "../order/order.schema";
import { Reviews } from "../reviews/reviews.schema";
import { Users } from "../users/users.schema";

const userCounts = async () => {
  const abusiveAccounts = await Users.countDocuments({ behavior: "ABUSIVE" });
  const fakeAccounts = await Users.countDocuments({ behavior: "FAKE" });
  const spammingAccounts = await Users.countDocuments({
    behavior: "SPAMMING",
  });
  const friendlyAccounts = await Users.countDocuments({
    behavior: "FRIENDLY",
  });

  return {
    abusiveAccounts,
    fakeAccounts,
    spammingAccounts,
    friendlyAccounts,
  };
};

const reviewCounts = async () => {
  const totalReviews = await Reviews.countDocuments();
  const pendingReviews = await Reviews.countDocuments({
    reviewStatus: "PENDING",
  });
  const publishedReviews = await Reviews.countDocuments({
    reviewStatus: "APPROVED",
  });
  const rejectedReviews = await Reviews.countDocuments({
    reviewStatus: "BLOCKED",
  });

  return {
    totalReviews,
    pendingReviews,
    publishedReviews,
    rejectedReviews,
  };
};

const orderCounts = async () => {
  const totalSales = await Orders.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);

  const totalOrders = await Orders.countDocuments();
  const pendingOrders = await Orders.countDocuments({ orderStatus: "PENDING" });
  const preparingOrders = await Orders.countDocuments({
    orderStatus: "PREPARING",
  });
  const onTheWayOrders = await Orders.countDocuments({
    orderStatus: "ON_THE_WAY",
  });
  const deliveredOrders = await Orders.countDocuments({
    orderStatus: "DELIVERED",
  });
  const cancelOrders = await Orders.countDocuments({
    orderStatus: "CANCELED",
  });

  return {
    totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
    totalOrders,
    pendingOrders,
    preparingOrders,
    onTheWayOrders,
    deliveredOrders,
    cancelOrders,
  };
};

export const AdminService = {
  userCounts,
  reviewCounts,
  orderCounts,
};
