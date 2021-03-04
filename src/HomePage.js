import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import HideAppBar from "./components/Header";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import RecipeReviewCard from "./components/HomeBlogCard";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import BackToTop from './components/BackToTop'
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import PropTypes from "prop-types";
import Copyright from './components/Copyright'
import Sidebar from "./components/Sidebar";

import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import SwipeableTemporaryDrawer from "./components/Drawer";
import Pagination from "@material-ui/lab/Pagination";
import BlogCard from "./components/HomeBlogCard";
import withStyles from "@material-ui/core/styles/withStyles";
import AxiosInterceptors from "./axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
const useStyles = theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    blogCard:{

        direction:"column",
        // justify:"center",
        // alignItems:"center",
    },
    mainGrid: {
        marginTop: theme.spacing(3),
        //direction:"row"
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        direction:"row",
    },
});

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

const sidebar = {
    title: 'Notification',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogsData:{"records":[],"pages":1},
            //myblogChecked:false,
            blogsMode:1,
            selectName:'',
            OrderBy:"created",
            OrderMode:"Desc",
            gotData:false,
            pageNow:1,

        };

    }
    getBlogs(page,mode,OrderBy,OrderMode){
        console.log("page:",page)
        fetch('http://localhost:8080/blogs'+'?currentPage='+page+'&mode='+mode+'&OrderBy='+OrderBy+'&OrderMode='+OrderMode
            ,{
                method:'GET',
                headers:{
                    "Authorization":JSON.parse(localStorage.getItem("jwt")).jwt
                }

            })
            .then(res =>res.json())
            .then((body) => {
                console.log(body.data)
                if(body.data)
                    this.setState({
                        blogsData:body.data,
                        gotData:true

                    })
            })
    }
    componentDidMount(){
        this.getBlogs(1,1,"created","Desc")

    }
    RefreshBlogs(){
        console.log("刷新主页")
        this.getBlogs(this.state.pageNow,this.state.blogsMode,this.state.OrderBy,this.state.OrderMode);
    }
    PageChange=(event, page)=>{
        console.log("page:",page)
        this.setState({ pageNow: page})
        this.getBlogs(page,this.state.blogsMode,this.state.OrderBy,this.state.OrderMode)
    }
    blogsModeMenuChange = (event) => {
        this.setState({ blogsMode: event.target.value },()=>{
            this.getBlogs(this.state.pageNow,this.state.blogsMode,this.state.OrderBy,this.state.OrderMode);
        });//更改按钮状态

    };
    OrderByMenuChange = (event) => {
        this.setState({ OrderBy: event.target.value },()=>{
            this.getBlogs(this.state.pageNow,this.state.blogsMode,this.state.OrderBy,this.state.OrderMode);
        });//更改按钮状态

    };
    OrderModeMenuChange = (event) => {
        this.setState({ OrderMode: event.target.value },()=>{
            this.getBlogs(this.state.pageNow,this.state.blogsMode,this.state.OrderBy,this.state.OrderMode);
        });//更改按钮状态

    };

    render()
    {
        // const blogsData=this.state.blogsData
        const {classes} = this.props
        return (
            <React.Fragment>
                <CssBaseline/>

                <PrimarySearchAppBar history={ this.props.history } />

                <Toolbar id="back-to-top-anchor"/>

                <Container>
                    {/*<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>*/}
                    {/*    Pricing*/}
                    {/*</Typography>*/}
                    {/*<RecipeReviewCard/>*/}

                    <Grid container spacing={0}>
                        <Grid container spacing={3} xs className={classes.blogCard}>
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox checked={this.state.myblogChecked} onChange={this.CheckboxChange} name="myblogChecked" />}*/}
                            {/*    label="MY BLOGS"*/}
                            {/*/>*/}
                            <Grid className={classes.formControl}>
                                <Grid ms={3}>
                                    <InputLabel id="demo-simple-select-label">Selector</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //native
                                        value={this.state.blogsMode}
                                        onChange={this.blogsModeMenuChange}
                                    >
                                        <MenuItem value={1}>All</MenuItem>
                                        <MenuItem value={2}>Mine</MenuItem>
                                        <MenuItem value={3}>Others</MenuItem>
                                        {/*<MenuItem value={2}>My Blogs</MenuItem>*/}

                                    </Select>
                                </Grid>
                                <Grid ms={3}>
                                    <InputLabel id="demo-simple-select-label">OrderBy</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //native
                                        value={this.state.OrderBy}
                                        onChange={this.OrderByMenuChange}
                                    >
                                        <MenuItem value="created">Created Time</MenuItem>
                                        <MenuItem value="title">Title</MenuItem>
                                        <MenuItem value="user_id">User Id</MenuItem>
                                        <MenuItem value="id">Blog Id</MenuItem>
                                        <MenuItem value="description">Description</MenuItem>
                                        <MenuItem value="content">Content</MenuItem>
                                        {/*id,created,description,title,user_id,content*/}
                                        {/*<MenuItem value={2}>My Blogs</MenuItem>*/}

                                    </Select>
                                </Grid>
                                <Grid ms={3}>
                                    <InputLabel id="demo-simple-select-label">OrderMode</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //native
                                        value={this.state.OrderMode}
                                        onChange={this.OrderModeMenuChange}
                                    >
                                        <MenuItem value="Desc">Desc</MenuItem>
                                        <MenuItem value="Asc">Asc</MenuItem>
                                        {/*<MenuItem value={2}>My Blogs</MenuItem>*/}

                                    </Select>
                                </Grid>
                            </Grid>

                            {this.state.blogsData.records.map((post) => (
                                <BlogCard key={post.id} post={post} history={this.props.history} RefreshBlogs={this.RefreshBlogs.bind(this)}/>
                            ))}
                            <Pagination count={this.state.blogsData.pages} color="secondary" onChange={this.PageChange}/>
                        </Grid>
                        <Grid xs={3}>
                            <Button onClick={()=>this.props.history.push('/newblog')}><Typography>NewBlog</Typography></Button>
                            <Sidebar
                                title={sidebar.title}
                                description={sidebar.description}
                                archives={sidebar.archives}
                                social={sidebar.social}
                            />
                        </Grid>


                    </Grid>
                    {/*<Typography variant="h5" align="center" color="textSecondary" component="p">*/}
                    {/*    Quickly build an effective pricing table for your potential customers with this layout.*/}
                    {/*    It&apos;s built with default Material-UI components with little customization.*/}
                    {/*</Typography>*/}

                </Container>
                {/* End hero unit */}
                {/*<Container maxWidth="md" component="main">*/}
                {/*    <Grid container spacing={5} alignItems="flex-end">*/}
                {/*        {tiers.map((tier) => (*/}
                {/*            // Enterprise card is full width at sm breakpoint*/}
                {/*            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>*/}
                {/*                <Card>*/}
                {/*                    <CardHeader*/}
                {/*                        title={tier.title}*/}
                {/*                        subheader={tier.subheader}*/}
                {/*                        titleTypographyProps={{align: 'center'}}*/}
                {/*                        subheaderTypographyProps={{align: 'center'}}*/}
                {/*                        action={tier.title === 'Pro' ? <StarIcon/> : null}*/}
                {/*                        className={classes.cardHeader}*/}
                {/*                    />*/}
                {/*                    <CardContent>*/}
                {/*                        <div className={classes.cardPricing}>*/}
                {/*                            <Typography component="h2" variant="h3" color="textPrimary">*/}
                {/*                                ${tier.price}*/}
                {/*                            </Typography>*/}
                {/*                            <Typography variant="h6" color="textSecondary">*/}
                {/*                                /mo*/}
                {/*                            </Typography>*/}
                {/*                        </div>*/}
                {/*                        <ul>*/}
                {/*                            {tier.description.map((line) => (*/}
                {/*                                <Typography component="li" variant="subtitle1" align="center"*/}
                {/*                                            key={line}>*/}
                {/*                                    {line}*/}
                {/*                                </Typography>*/}
                {/*                            ))}*/}
                {/*                        </ul>*/}
                {/*                    </CardContent>*/}
                {/*                    <CardActions>*/}
                {/*                        <Button fullWidth variant={tier.buttonVariant} color="primary">*/}
                {/*                            {tier.buttonText}*/}
                {/*                        </Button>*/}
                {/*                    </CardActions>*/}
                {/*                </Card>*/}
                {/*            </Grid>*/}
                {/*        ))}*/}
                {/*    </Grid>*/}
                {/*</Container>*/}
                {/* Footer */}
                <Container maxWidth="md" component="footer" className={classes.footer}>
                    <Grid container spacing={4} justify="space-evenly">
                        {footers.map((footer) => (
                            <Grid item xs={6} sm={3} key={footer.title}>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    {footer.title}
                                </Typography>
                                <ul>
                                    {footer.description.map((item) => (
                                        <li key={item}>
                                            <Link href="#" variant="subtitle1" color="textSecondary">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Container>
                {/* End footer */}
                <BackToTop/>

            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(HomePage)
// export default class HomePage extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             blogsData:{records:[]}
//         };
//
//     }
//     getBlogs(page){
//         console.log(page)
//         fetch('http://localhost:8080/blogs'+'?currentPage='+page
//             ,{
//             method:'GET',
//
//         })
//             .then(res =>res.json())
//             .then((body) => {
//                 console.log(body.data.records)
//                 this.setState({
//                     blogsData:body.data
//                 })
//             })
//     }
//     componentDidMount(){
//         this.getBlogs(1)
//
//     }
//     render(){
//         const blogsData=this.state.blogsData
//         return (
//             <HomePageFunc
//                 blogsData={blogsData}
//                 getBlogs={this.getBlogs.bind(this)}//传给子组件
//             />
//         )
//     }
// }
