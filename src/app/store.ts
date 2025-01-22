import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/reducer/userSlice.tsx";
import roomReducer from "@/app/reducer/roomSlice.tsx";
import departmentReducer from "@/app/reducer/departmentSlice.tsx";
import positionReducer from "@/app/reducer/positionSlice.tsx";
import customerReducer from "@/app/reducer/customerSlice.tsx";
import employeeReducer from "@/app/reducer/employeeSlice.tsx";
import rdetailReducer from "@/app/reducer/rdetailSlice.tsx";
import reservationReducer from "@/app/reducer/reservationSlice.tsx";
import rpictureReducer from "@/app/reducer/rpictureSlice.tsx";
import pcategoryReducer from "@/app/reducer/pcategorySlice.tsx";
import productReducer from "@/app/reducer/productSlice.tsx";
// import counterReduce from "./reducer/counter";
import searchCateReducer from "@/app/reducer/searchCateSlice.tsx";
import banknoteRducer from "@/app/reducer/bankNoteSlice.tsx";
import openshiftReducer from "@/app/reducer/openShiftSlice.tsx";
import closeshiftReducer from "@/app/reducer/closeShiftSlice.tsx";

export default configureStore({
  reducer: {
    users: userReducer,
    rooms: roomReducer,
    departments: departmentReducer,
    positions: positionReducer,
    customers: customerReducer,
    employees: employeeReducer,
    rdetails: rdetailReducer,
    rpictures: rpictureReducer,
    reservations: reservationReducer,
    pcategories: pcategoryReducer,
    products: productReducer,
    searchCates: searchCateReducer,
    banknotes: banknoteRducer,
    openshifts: openshiftReducer,
    closeshifts: closeshiftReducer,
    // counters: counterReduce,
  },
});
