import React, {useState} from "react";
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyle from './styles';
import Input from "./InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup, signin } from '../../actions/auth';

const initialState = { firstName:"", lastName:"", email:"", password:"", confirmPassword:"" }

const Auth = () => {
 
    const classes = useStyle();
    const [showPassword, setShowPassowrd] = useState(false);
    const [isSignup, setSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData, navigate))
        } else{
            dispatch(signin(formData, navigate))
        }
        console.log(formData);
    }
    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleShowPassword = () => {
        setShowPassowrd((prevshowPassword)=> !prevshowPassword);
    }
    const switchMode = () => {
        setSignup((previsSignup)=> !previsSignup);
        setShowPassowrd(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "password" : "text" } handleShowPassword={handleShowPassword}/>
                        {isSignup && (<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>)}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup?'Sign Up':'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{
                                isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'
                            }</Button>
                        </Grid>
                    </Grid>
                </form> 
            </Paper>
        </Container>
    );
}

export default Auth;
