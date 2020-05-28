import React from "react";
import {
  Container,
  Icon,
  Segment,
  Form,
  Button,
  TextArea,
  Message,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";
import firebase from "../config/firebase";
import PlaceList from "./PlaceList";

class AddNewPlace extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Attraction");
    this.state = {
      category: "",
      city: "",
      documentName: "",
      description: "",
      linkReservation: "",
      name: "",
      openingHour: "",
      ticketPrice: "",
      photoLink: "",
      linkPhoto: [],
      longitude: "",
      latitude: "",
      region: "",
      error: false,
      allPlaces: [],
      loading: true
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = querySnapshot => {
    let newPlaces = [];
    querySnapshot.forEach(doc => {
      newPlaces = [...newPlaces, doc.data()];
    });

    this.setState({
      allPlaces: newPlaces,
      loading: false
    });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const coordinates = {
      longitude: this.state.longitude,
      latitude: this.state.latitude
    };
    const {
      category,
      city,
      description,
      linkPhoto,
      linkReservation,
      name,
      openingHour,
      ticketPrice,
      region
    } = this.state;
    const newData = {
      category,
      city,
      description,
      linkPhoto,
      linkReservation,
      name,
      openingHour,
      ticketPrice,
      coordinates,
      region
    };

    if (this.isFormValid()) {
      console.log(newData);
      firebase
        .firestore()
        .collection("Attraction")
        .doc(this.state.documentName)
        .set(newData);
      this.cleanFields();
    } else {
      this.setState({
        error: true
      });
    }
  };

  handleAddLink = () => {
    const newPhoto = [...this.state.linkPhoto, this.state.photoLink];
    this.setState({
      linkPhoto: newPhoto,
      photoLink: ""
    });
  };

  isFormValid = () => {
    return this.state.documentName;
  };
  cleanFields = () => {
    this.setState({
      category: "",
      city: "",
      documentName: "",
      description: "",
      linkReservation: "",
      ticketPrice: "",
      name: "",
      openingHour: "",
      photoLink: "",
      latitude: "",
      longitude: "",
      region: "",
      linkPhoto: [],
      error: false
    });
  };

  render() {
    const {
      category,
      city,
      documentName,
      description,
      linkReservation,
      ticketPrice,
      name,
      openingHour,
      photoLink,
      latitude,
      longitude,
      region,
      error
    } = this.state;
    return (
      <Container>
        <Segment basic>
          <Header as="h2" icon textAlign="center">
            <Header.Content>Polonia Tour / Add Place</Header.Content>
          </Header>
          <Form style={{ maxWidth: "400px", margin: "auto" }}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                placeholder="Longitude"
                name="longitude"
                value={longitude}
                onChange={this.handleOnChange}
              />
              <Form.Input
                fluid
                placeholder="Latitude"
                name="latitude"
                value={latitude}
                onChange={this.handleOnChange}
              />
            </Form.Group>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Document Name"
                name="documentName"
                value={documentName}
                error={error}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Region"
                name="region"
                value={region}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Category"
                name="category"
                value={category}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="City"
                name="city"
                value={city}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Field
                control={TextArea}
                style={{ resize: "none" }}
                onChange={this.handleOnChange}
                name="description"
                value={description}
                placeholder="Description"
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                fluid
                placeholder="Link Reservation"
                name="linkReservation"
                value={linkReservation}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Opening Hour"
                name="openingHour"
                value={openingHour}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Ticket Price"
                name="ticketPrice"
                value={ticketPrice}
                onChange={this.handleOnChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                action
                fluid
                placeholder="Photo Links"
                name="photoLink"
                value={photoLink}
                onChange={this.handleOnChange}
              >
                <input />
                <Button
                  type="submit"
                  basic
                  positive
                  onClick={this.handleAddLink}
                >
                  <Icon name="plus" />
                  Add link
                </Button>
              </Form.Input>
            </Form.Field>
            {this.state.linkPhoto.length > 0 ? (
              <Form.Field>
                <Message style={{ wordWrap: "break-word" }}>
                  <Message.Header>Photo Links</Message.Header>
                  <Message.List key={1} items={this.state.linkPhoto} />
                </Message>
              </Form.Field>
            ) : null}
            <Button type="submit" onClick={this.handleSubmit}>
              <Icon name="save" />
              Add new place
            </Button>
          </Form>
        </Segment>
        <React.Fragment>
          <Dimmer active={this.state.loading}>
            <Loader content="Places are loading..." />
          </Dimmer>
          <PlaceList
            places={this.state.allPlaces}
            loading={this.state.loading}
          />
        </React.Fragment>
      </Container>
    );
  }
}

export default AddNewPlace;
