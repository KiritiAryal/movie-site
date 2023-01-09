import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { MdDone } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  width: 400,
  bgcolor: "#000000",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
import "./WatchlistDisplay.css";
import {
  remove,
  clearList,
  setWatchlistObj,
  setWatchlistCt,
} from "../../features/watchlist/watchlistSlice";
import { db } from "../../auth/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

function Watchlist() {
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { watchlistCt, watchlistObj } = useSelector((store) => store.watchlist);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  const handleSubmit = () => {
    dispatch(clearList(currentUser?.email));
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
      onSnapshot(doc(db, currentUser?.email, "watchlist"), (doc) => {
        let data = doc.data();
        if (data) {
          dispatch(setWatchlistObj(data.array));
          dispatch(setWatchlistCt());
        }
      });
    } else {
    }
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: "#f2f2f2",
        borderRadius: "0.2rem",
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)",
        overflow: "scroll",
        width: "60vw",
        position: "absolute",
        left: "30%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          gap: "20px",
          width: "inherit",
          marginBottom: "40px",
        }}
      >
        <div className="header">
          <h1 className="heading">Your Watchlist</h1>
          <button
            className="edit-button"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode && watchlistCt ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1px",
                }}
              >
                <MdDone fill="green" size={29} />
                <span className="button-title">DONE</span>
              </Box>
            ) : (
              <>
                <span className="lister-widget-sprite lister-action edit"></span>
                <span className="button-title">EDIT</span>
              </>
            )}
          </button>
          <hr className="line-header" />
          <h5 className="count">{watchlistCt} Titles</h5>

          <hr className="line-header" />
        </div>
        {!watchlistCt ? (
          <div>
            <Typography variant="h6">
              Your watchlist is currently empty. Add movies to watchlist to see
              them here!
            </Typography>
          </div>
        ) : (
          <></>
        )}

        {watchlistObj.map((w) => {
          const {
            id,
            title,
            overview,
            release_date,
            runtime,
            img,
            vote,
            actors,
          } = w;
          const link = "details/" + id;
          const styles = {
            boxContainer: {
              backgroundImage: `url(${img})`,
              height: "142px",
              width: "96px",
            },
          };
          function toHoursAndMinutes(totalMinutes) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
          }

          return (
            <div className="watchlist-card" key={w.id}>
              <Box sx={{ display: "flex" }}>
                <Link to={`/details/${id}`}>
                  <CardMedia component="img" style={styles.boxContainer} />
                </Link>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    padding: "0px 0px 0px 16px",
                  }}
                >
                  <a className="link" href={link}>
                    {title}
                  </a>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ color: "#aaa" }}>
                      <span className="star"></span> {vote?.toFixed(1)}
                    </Typography>
                    <p className="seperator">|</p>
                    <Typography
                      className="truncate-year"
                      sx={{ color: "#aaa" }}
                    >
                      {release_date}
                    </Typography>
                    <p className="seperator">|</p>
                    <Typography sx={{ color: "#aaa" }}>
                      {toHoursAndMinutes(runtime)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    {actors?.map((actor) => {
                      return (
                        <Box
                          key={actor.id}
                          sx={{
                            display: "flex",
                            marginTop: "4px",
                            fontFamily: "Verdana",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#136cb2",
                              fontSize: "12px",
                            }}
                          >
                            {actor.name}
                          </Typography>
                          <p className="seperator actors">|</p>
                        </Box>
                      );
                    })}
                  </Box>
                  <p className="overview-watchlist">{overview}</p>
                </CardContent>
              </Box>

              {editMode ? (
                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(remove({ id, email: currentUser?.email }))
                  }
                >
                  <BsTrash fill="red" size={20} className="icon" />
                  Remove
                </button>
              ) : (
                <></>
              )}
              <hr className="line" />
            </div>
          );
        })}
      </Box>
      {editMode && watchlistCt ? (
        <div>
          <footer>
            <Button
              variant="outlined"
              className="clear-btn"
              onClick={() => setOpen(true)}
            >
              clear cart
            </Button>
          </footer>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  alignItems: "center",
                  border: "10px solid black",
                }}
              >
                <Typography variant="h6" component="h2">
                  Clear All from Watchlist?
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleSubmit}
                    sx={{ width: "100px" }}
                  >
                    Confirm
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default Watchlist;
