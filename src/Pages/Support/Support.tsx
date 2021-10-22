import { LinearProgress } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useQuery } from "react-query";

type PeopleType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type RequestType = {
  page: number;
  per_page: number;
  total_pages: number;
  data: PeopleType[];
};

const useStyles = makeStyles({
  supportPeopleContainer: {
    width: "100%",
    position: "relative",
    textAlign: "center",
  },
  supportPeopleCard: {
    width: "250px",
    height: "250px",
    border: ".5px solid black",
    display: "inline-block",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
  },
  supportPeopleCardImg: {
    height: "128px",
    width: "128px",
    borderRadius: "10px",
  },
});

const getPeople = async (): Promise<RequestType> => {
  return await fetch("https://reqres.in/api/users?page=2").then((response) =>
    response.json()
  );
};

export default function Support() {
  const classes = useStyles();
  const { data, isLoading, error } = useQuery("people", getPeople);

  if (isLoading) return <LinearProgress />;
  return (
    <div className={classes.supportPeopleContainer}>
      {data?.data.map((item) => {
        return (
          <div key={item.id} className={classes.supportPeopleCard}>
            <img className={classes.supportPeopleCardImg} src={item.avatar} />
            <p>
              {item.first_name} <strong>{item.last_name}</strong>
            </p>
            <p>{item.email}</p>
          </div>
        );
      })}
    </div>
  );
}
