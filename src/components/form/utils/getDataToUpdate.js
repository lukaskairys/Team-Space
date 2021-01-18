export const getDataToUpdate = (values) => {
  const dataToPost = {
    userName: `${values.firstName} ${values.lastName}`,
    email: values.email,
    userImage: "https://i.imgur.com/2DEZq70.jpg",
    birthdayDate: "",
    location: "",
    reservations: {
      books: [],
      devices: [],
      rooms: [],
    },
    notifications: [],
    liked: {
      restaurants: [],
      books: [],
      devices: [],
      rooms: [],
      stories: [],
    },
    checkIn: {},
    rated: {
      books: [],
    },
  };

  const dataToChange = {
    userName: values.userName,
    location: values.location,
    birthdayDate: values.birthday,
  };

  const passwords = {
    old: values.currentPassword,
    new: values.newPassword,
    repeat: values.repeatPassword,
  };
  return { dataToPost, dataToChange, passwords };
};
