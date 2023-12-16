import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import Error from "../../assets/error-404.png";
const NotFound = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src={Error}
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{
              mb: 3,
              fontSize: "2.25rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              lineHeight: "1.2",
            }}
            variant="h3"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="rgba(203, 204, 210, 0.5)"
            variant="body1"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Button
            sx={{
              borderColor: "#A1A1A1",
              background: "#A1A1A1",
              mt: 3,
            }}
            href="/"
            startIcon={
              <SvgIcon fontSize="small" style={{}}>
                <ArrowLeftIcon />
              </SvgIcon>
            }
            // sx={{ }}
            variant="contained"
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
