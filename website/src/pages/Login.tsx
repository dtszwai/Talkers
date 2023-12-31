import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  const { login } = useAuthServiceContext()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const status = await login(username, password);
      if (status === 401) {
        console.log("Unauthorized")
        formik.setErrors({
          username: "Invalid username or password.",
          password: "Invalid username or password."
        })
      } else {
        navigate("/")
      }
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.username) {
        errors.username = "Required"
      }
      if (!values.password) {
        errors.password = "Required"
      }
      return errors
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 8 }}>
        <Typography variant="h5" noWrap component="h1" sx={{ fontWeight: 500, pb: 2 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="on"
            margin="normal"
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="contained" disableElevation type="submit" sx={{ mt: 1, mb: 2 }}>Next</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;