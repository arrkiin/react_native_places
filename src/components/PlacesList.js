import React from 'react';
import ListItem from './ListItem';

const placesList = ({ places }) =>
    places.map((place, idx) => <ListItem key={idx} placeName={place} />);

export default placesList;
