const arr = [
  {
    id: 1,
    name: "John cena",
  },
  {
    id: 2,
    name: "John Doe",
  },
  {
    id: 3,
    name: "Dwayne Johnson",
  },
  {
    id: 4,
    name: "Tom Cruise",
  },
];

const bookings = [
  {
    id: 1,
    user_id: 1,
    room_id: 1,
    start_time: "2023-01-01 10:00:00",
    end_time: "2023-01-01 12:00:00",
    created_at: "2023-01-01 10:00:00",
    updated_at: "2023-01-01 10:00:00",
  },
  {
    id: 2,
    user_id: 2,
    room_id: 2,
    start_time: "2023-01-01 10:00:00",
    end_time: "2023-01-01 12:00:00",
    created_at: "2023-01-01 10:00:00",
    updated_at: "2023-01-01 10:00:00",
  },
];

const filter = bookings.map((booking) =>
  arr.filter((user) => user.id == booking.user_id)
);

/* Output:
[
  [{ id: 1, name: 'John cena' }],
  [{ id: 2, name: 'John Doe' }]
]
*/
