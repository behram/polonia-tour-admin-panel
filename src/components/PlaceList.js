import React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const PlaceList = ({ places}) => (
  <Table
    basic="very"
    celled
    collapsing
    style={{ margin: "auto", marginTop: "25px" }}
  >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>City</Table.HeaderCell>
        <Table.HeaderCell>Short Description</Table.HeaderCell>
        <Table.HeaderCell>Region</Table.HeaderCell>
        <Table.HeaderCell>Opening Hours</Table.HeaderCell>
        <Table.HeaderCell>Ticket Price</Table.HeaderCell>
        <Table.HeaderCell>Link Reservation</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {places.map((place, i) => (
        <Table.Row key={i}>
          <Table.Cell>
            <Header as="h4" image>
              {typeof place.linkPhoto[0] !== 'undefined' && place.linkPhoto[0].length > 0 ? (
                <Image src={place.linkPhoto[0]} rounded size="huge" />
              ) : null}
              <Header.Content>
                {place.name}
                <Header.Subheader style={{ textTransform: "uppercase" }}>
                  <p>{place.category} </p>
                  <p>{place.city}</p>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "200px"
            }}
          >
            {place.description}
          </Table.Cell>
          <Table.Cell>{place.region}</Table.Cell>
          <Table.Cell>{place.openingHour ? place.openingHour : "-"}</Table.Cell>
          <Table.Cell>
            {place.ticketPrice
              ? place.ticketPrice === "Free" || place.ticketPrice === "free"
                ? place.ticketPrice
                : `${place.ticketPrice}zl`
              : "-"}{" "}
          </Table.Cell>
          <Table.Cell>
            <a href={place.linkReservation} target="_blank">
              Go to Link
            </a>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default PlaceList;
