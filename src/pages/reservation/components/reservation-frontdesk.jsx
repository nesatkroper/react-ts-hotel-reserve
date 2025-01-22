import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "@/providers/axiosInstance";
import Details from "./reservation-detail";

//! THIS IS LOCAL VARIABLE
const SINGLE_ROOM = 12;
const DOUBLE_ROOM = 9;

//! FUNCTION TO FORMAT NUMBERS WITH LEADING ZERO
const F_NUM = (num) => {
  return num.toString().padStart(2, "0");
};

//! THIS IS MAIN FUNC
const FrontDesk = () => {
  //! THIS IS STATE MANAGEMENT
  const [thisMonth, setThisMonth] = useState(1);
  const [reserve, setReserve] = useState(false);
  const [booked, setBooked] = useState([]);
  const [available, setAvailable] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleDateString("en-US", { month: "long" })
  );

  const DAYS_IN_MONTH = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + thisMonth,
    0
  ).getDate();

  // ! THIS IS A FUNC USE FOR ALLOW RESERVATION
  const handleReservation = () => {
    setReserve(!reserve);
  };

  //! THIS IS A FUNC USE FOR HANDLE CHECKBOX CHANGING
  const handleCheckboxChange = (roomType, roomNumber, day) => {
    console.log(
      `Room Type: ${roomType}, Room Number: ${roomNumber}, Date: ${day}`
    );
  };

  //! THIS IS A FUNC USE FOR HANDLE SUBMITION
  const handleSubmit = async (e) => {
    e.preventDefault();

    //! CREATE ARRAYS WITH DAYS (MATCHING YOUR TABLE COLUMNS)
    const bookedByDay = Array(DAYS_IN_MONTH).fill(0);
    const availableByDay = Array(DAYS_IN_MONTH).fill(SINGLE_ROOM + DOUBLE_ROOM);

    //! GET ALL CHECKBOXES
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    //! COUNT BOOKINGS FOR EACH DAY
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const dayIndex = index % DAYS_IN_MONTH;
        bookedByDay[dayIndex]++;
        availableByDay[dayIndex]--;
      }
    });

    //! HANDLE POST REQUEST TO SERVER FOR RESERVATION
    await axios
      .post("/reserve", {
        room_id: 3,
        customer_id: 1,
        checkin_date: "2025-01-05",
        checkout_date: "2025-05-05",
        is_checkin: "true",
        is_checkout: "false",
        reservation_type: "booked",
        adults: 7,
        children: 4,
        payment_status: "paid",
        payment_method: "cash",
        memo: "hello",
        is_hidden: "false",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    //! Update state with new booked and available arrays
    setBooked(bookedByDay);
    setAvailable(availableByDay);
  };

  //! THIS IS A FUNC USE FOR UPDATING DATE
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + thisMonth - 1);
    setCurrentMonth(date.toLocaleDateString("en-US", { month: "long" }));
  }, [thisMonth]);

  console.log(thisMonth);
  console.log(currentMonth);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="w-full">
          <CardHeader className="px-5 py-2 bg-muted rounded-t-lg ">
            <div className="flex justify-between">
              <CardTitle>Front Desk</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={handleReservation}
                  variant="outline"
                  type="button"
                  className="py-0 h-[30px] bg-yellow-500"
                >
                  <Label>Reserve</Label>
                </Button>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      className="py-0 h-[30px] bg-green-500"
                    >
                      Check
                    </Button>
                  </DialogTrigger>
                  {/* //! RESERVATION DETAILS INFORMATION */}
                  <Details />
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="pe-1">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    <p>{currentMonth}</p>
                    <div className="flex justify-between p-1">
                      <Button
                        onClick={() => {
                          setThisMonth(thisMonth - 1);
                        }}
                        variant="outline"
                        className="h-[25px]"
                      >
                        <ChevronLeft />
                      </Button>
                      <Button
                        onClick={() => {
                          setThisMonth(thisMonth + 1);
                        }}
                        variant="outline"
                        className="h-[25px]"
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </TableHead>
                  {Array.from({ length: DAYS_IN_MONTH }, (_, index) => {
                    const date = new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + thisMonth - 1,
                      index + 1
                    );
                    return (
                      <TableHead key={index} className="text-center">
                        <p>
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <p>
                          {date.toLocaleDateString("en-US", {
                            day: "numeric",
                          })}
                        </p>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody className="pe-1">
                <TableRow className="font-semibold bg-muted ">
                  <TableCell
                    colspan={DAYS_IN_MONTH + 1}
                    className="text-center py-1"
                  >
                    Single Room
                  </TableCell>
                </TableRow>
                {Array.from({ length: SINGLE_ROOM }, (_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="text-center p-0 font-semibold whitespace-nowrap">
                        Room-2{F_NUM(index + 1)}
                      </TableCell>
                      {Array.from({ length: DAYS_IN_MONTH }, (__, step) => {
                        return (
                          <TableCell key={step} className="text-center p-0">
                            <Checkbox
                              className="w-[40px] h-[20px]"
                              disabled={reserve ? false : true}
                              onCheckedChange={() =>
                                handleCheckboxChange(
                                  "Single",
                                  `Room-20${index + 1}`,
                                  step + 1
                                )
                              }
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}

                <TableRow className="font-semibold bg-muted">
                  <TableCell
                    colspan={DAYS_IN_MONTH + 1}
                    className="text-center py-1"
                  >
                    Double Room
                  </TableCell>
                </TableRow>
                {Array.from({ length: DOUBLE_ROOM }, (_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="text-center p-0 font-semibold whitespace-nowrap">
                        Room-1{F_NUM(index + 1)}
                      </TableCell>
                      {Array.from({ length: DAYS_IN_MONTH }, (__, step) => {
                        return (
                          <TableCell key={step} className="text-center p-0">
                            <Checkbox
                              className="w-[40px] h-[20px]"
                              disabled={reserve ? false : true}
                              onCheckedChange={() =>
                                handleCheckboxChange(
                                  "Single",
                                  `Room-20${index + 1}`,
                                  step + 1
                                )
                              }
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell
                    colspan={DAYS_IN_MONTH + 1}
                    className="text-center font-semibold bg-muted py-1 "
                  >
                    Summary
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-center py-1 ">
                    Booked
                  </TableCell>
                  {booked.map((item, index) => (
                    <TableCell
                      key={index}
                      className={
                        item > 0
                          ? "py-1 text-center font-semibold bg-green-500"
                          : "py-1 text-center font-semibold"
                      }
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-center py-1 rounded-bl-lg">
                    Available
                  </TableCell>
                  {available.map((item, index) => (
                    <TableCell
                      key={index}
                      className={
                        item < 10 && item >= 5
                          ? "py-1 text-center font-semibold bg-yellow-400"
                          : item < 5
                          ? "py-1 text-center font-semibold bg-red-400"
                          : "py-1 text-center font-semibold"
                      }
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default FrontDesk;
