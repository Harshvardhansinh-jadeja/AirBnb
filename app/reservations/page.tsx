import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please log in " />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No Reservations found"
        subtitle="Lookd like no reservations made on your property"
      />
    );

  return (
    <ReservationClient currentUser={currentUser} reservations={reservations} />
  );
};

export default ReservationsPage;
