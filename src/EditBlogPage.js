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
import Blog from "./components/Blog";
import MarkdownEditor from "./components/MarkdownEditor";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
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
    title: 'About',
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

class EditBlogPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogData:{"id": 1,
                "userId": 1,
                "title": "生活就像海洋，只有意志坚强的人才能到达彼岸",
                "description": "这里是摘要哈哈哈",
                "content": "内容？？？",
                "created": "2020-05-21T22:08:42",
                "status": 0},

        };

    }
    getBlogById(id){
        console.log(id)
        fetch('http://localhost:8080/blog/'+id
            ,{
                method:'GET',

            })
            .then(res =>res.json())
            .then((body) => {
                console.log(body)
                this.setState({
                    blogData:body.data
                })
            })
    }
    componentDidMount(){
        this.getBlogById(this.props.match.params.id)

    }
    titleChange=(event)=>{
        let prevData=this.state.blogData
        let data = Object.assign({}, prevData, { title: event.target.value })
        this.setState({blogData:data})
    }
    descriptionChange=(event)=>{
        let prevData=this.state.blogData
        let data = Object.assign({}, prevData, { description: event.target.value })
        this.setState({blogData:data})
    }
    // handleChangePage(event, page){
    //     this.getBlogs(page);
    // }
    bindRef = ref => { this.MarkdownEditor = ref }
    render()
    {
        const id =this.props.match.params.id
        //const blogsData=this.state.blogsData
        const {classes} = this.props
        let data=this.state.blogData
        return (
            <React.Fragment>
                <CssBaseline/>

                <PrimarySearchAppBar history={ this.props.history }/>

                <Toolbar id="back-to-top-anchor"/>

                <Container>
                    {/*<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>*/}
                    {/*    Pricing*/}
                    {/*</Typography>*/}
                    {/*<RecipeReviewCard/>*/}

                    <Grid container spacing={0} direction={"row"}>
                        {/*<Grid ms={12}>*/}
                        {/*    /!*<Typography >{id}</Typography>*!/*/}

                        {/*</Grid>*/}

                        <Grid xs>
                            {/*<Typography >{id}</Typography>*/}
                            <Typography variant="h2" color="textPrimary" gutterBottom>
                                Edit Blog
                            </Typography>
                            <TextField
                                id="outlined-textarea-title"
                                label="Title"
                                placeholder="Placeholder"
                                multiline
                                variant="outlined"
                                value={this.state.blogData.title}
                                onChange={this.titleChange}
                            />
                            <TextField
                                id="outlined-textarea-description"
                                label="Description"
                                placeholder="Placeholder"
                                multiline
                                variant="outlined"
                                value={this.state.blogData.description}
                                onChange={this.descriptionChange}
                            />
                            <Blog blogData={this.state.blogData}/>
                            <Grid xs={11}>
                            <MarkdownEditor triggerRef={this.bindRef} content={data.content} history={ this.props.history }/>
                            <Button onClick={()=>this.MarkdownEditor.PostMD(id,data.title,data.description)}>Submit</Button>
                            </Grid>
                        </Grid>
                        <Grid xs={3}>
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
export default withStyles(useStyles)(EditBlogPage)

