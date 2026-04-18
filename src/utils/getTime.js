const getTime = (alert) => {
  let createdDate;
  if (alert.createdAt && alert.createdAt.toDate) {
    // Firestore Timestamp
    createdDate = alert.createdAt.toDate();
  } else if (alert.createdAt && typeof alert.createdAt === "string") {
    // String ISO
    createdDate = new Date(alert.createdAt);
  } else if (alert.createdAt && alert.createdAt.seconds) {
    // Timestamp object
    createdDate = new Date(alert.createdAt.seconds * 1000);
  } else {
    // Fallback
    createdDate = new Date();
  }
  return createdDate;
};

export default getTime;
