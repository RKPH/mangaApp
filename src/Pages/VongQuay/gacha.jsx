import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const gachaItems = [
  {
    id: 1,
    name: "Silver orb",
    rarity: "N",
    rate: 80,
    point: 10,
    backgroundColor: "#c0c0c0", // silver
    textColor: "#000", // black
  },
  {
    id: 2,
    name: "L-Blue orb",
    rarity: "R",
    rate: 16,
    point: 20,
    backgroundColor: "#add8e6", // light blue
    textColor: "#000", // black
  },
  {
    id: 3,
    name: "Blue orb",
    rarity: "SR",
    rate: 3.2,
    point: 40,
    backgroundColor: "#0000ff", // blue
    textColor: "#fff", // white
  },
  {
    id: 4,
    name: "Purple orb",
    rarity: "SSR",
    rate: 0.64,
    point: 100,
    backgroundColor: "#800080", // purple
    textColor: "#fff", // white
  },
  {
    id: 5,
    name: "Pink orb",
    rarity: "UR",
    rate: 0.128,
    point: 300,
    backgroundColor: "#ffc0cb", // pink
    textColor: "#000", // black
  },
  {
    id: 6,
    name: "Red orb",
    rarity: "SUR",
    rate: 0.026,
    point: 500,
    backgroundColor: "#ff0000", // red
    textColor: "#fff", // white
  },
  {
    id: 7,
    name: "??? orb",
    rarity: "???",
    rate: 0.001,
    point: 1000000,
    backgroundColor: "#ffff00", // yellow
    textColor: "#000", // black
  },
];

const getRandomItem = (items) => {
  const totalWeight = items.reduce((acc, item) => acc + item.rate, 0);
  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const item of items) {
    cumulativeWeight += item.rate;
    if (random < cumulativeWeight) {
      return item;
    }
  }
};

export const getGachaItem = () => {
  const item = getRandomItem(gachaItems);
  return item;
};

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  marginBottom: 16,
  textAlign: "center",
  color: "#ff5722",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  backgroundColor: "#ff5722",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#e64a19",
  },
}));

const ResultContainer = styled(Box)(({ theme }) => ({
  marginTop: 20,
}));

const StyledCard = styled(Card)(({ theme, bgcolor, textcolor }) => ({
  margin: "10px",
  backgroundColor: bgcolor,
  color: textcolor, // Set text color dynamically
}));

const CardContentCentered = styled(CardContent)(({ theme }) => ({
  textAlign: "center",
}));

const ResultsBox = styled(Paper)(({ theme }) => ({
  padding: "20px",
  borderRadius: "15px",
  backgroundColor: "#fff",
  marginTop: "20px",
  maxWidth: "600px",
  margin: "20px auto",
}));

const Gacha = () => {
  const [gachaResult, setGachaResult] = useState(null);
  const [totalPoint, setTotalPoint] = useState(0);

  const gachaPull = () => {
    const item = getGachaItem();
    setGachaResult(item);
  };

  const gachaPullTotal = () => {
    const list = [];
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const item = getGachaItem();
      list.push(item);
      total += item.point;
    }
    setGachaResult(list);
    setTotalPoint(total);
  };

  return (
    <Container>
      <Title>Gacha Pull</Title>
      <Grid container justifyContent="center">
        <StyledButton onClick={gachaPull}>Pull Once</StyledButton>
        <StyledButton onClick={gachaPullTotal}>Pull 10 Times</StyledButton>
      </Grid>
      <ResultContainer>
        {Array.isArray(gachaResult) ? (
          <ResultsBox elevation={3}>
            <Typography variant="h5" align="center">
              Results of 10 pulls:
            </Typography>
            <Typography variant="h6" align="center">
              Total Point: {totalPoint}
            </Typography>
            <Grid container justifyContent="center">
              {gachaResult.map((result, index) => (
                <StyledCard
                  key={index}
                  bgcolor={result.backgroundColor}
                  textcolor={result.textColor}
                >
                  <CardContentCentered>
                    <Typography variant="h6">Index: {index + 1}</Typography>
                    <Typography variant="h5">You got: {result.name}</Typography>
                    <Typography>
                      Rarity: {result.rarity} - {result.rate}%
                    </Typography>
                    <Typography>Point: {result.point}</Typography>
                  </CardContentCentered>
                </StyledCard>
              ))}
            </Grid>
          </ResultsBox>
        ) : (
          gachaResult && (
            <ResultsBox elevation={3}>
              <StyledCard
                bgcolor={gachaResult.backgroundColor}
                textcolor={gachaResult.textColor}
              >
                <CardContentCentered>
                  <Typography variant="h5">
                    You got: {gachaResult.name}
                  </Typography>
                  <Typography>
                    Rarity: {gachaResult.rarity} - {gachaResult.rate}%
                  </Typography>
                  <Typography>Point: {gachaResult.point}</Typography>
                </CardContentCentered>
              </StyledCard>
            </ResultsBox>
          )
        )}
      </ResultContainer>
    </Container>
  );
};

export default Gacha;
