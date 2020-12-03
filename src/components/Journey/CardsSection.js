import React from "react";
import { Text, initializeIcons } from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import "office-ui-fabric-react/dist/css/fabric.css";

const container = {
  display: "flex",
  justifyContent: "center",
  margin: "1vh 0",
};

const icon = {
  fontSize: 24,
  padding: 15,
  verticalAlign: "middle",
  paddingLeft: 0,
  color: "#0078d4",
};

const styles = {
  cardStyles: {
    root: {
      background: "white",
      padding: 20,
      borderLeft: "5px solid #0078d4",
      width: 300,
      maxWidth: 400,
      margin: "auto",
    },
  },
  header: {
    root: {
      fontSize: 20,
      fontWeight: "bold",
    },
  },
  amount: {
    root: {
      fontSize: 26,
      paddingBottom: 20,
      paddingTop: 30,
    },
  },
  percentage: {
    root: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0078d4",
    },
  },
};

const cards = [
  {
    title: "Current Balance",
    amount: "$21 837",
    icon: "CaretRightOutline",
    percentage: "2.3",
  },
  {
    title: "Current Expanses",
    amount: "$10 927",
    icon: "PaymentCard",
    percentage: "0.3",
  },
  {
    title: "Current Income",
    amount: "$15 093",
    icon: "Savings",
    percentage: "1.3",
  },
];

const CardsSection = ({ shipment }) => {
  console.log(shipment);
  initializeIcons();
  return (
    <div style={container}>
      <div className="s-Grid-col ms-sm3 ms-xl3">
        <Card styles={styles.cardStyles}>
          <Card.Section>
            <Card.Item>
              <i
                style={icon}
                className="ms-Icon ms-Icon--caretRightOutline"
                aria-hidden="true"
              ></i>
              <Text styles={styles.header}>{shipment.receiver_name}</Text>
            </Card.Item>
            <Card.Item>
              <Text styles={styles.amount}>{shipment.preferred_time.time}</Text>
            </Card.Item>
            <Card.Item>
              <Text styles={styles.percentage}>{shipment.tracking_num}</Text>
            </Card.Item>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
};

export default CardsSection;
