import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import Markdown from "./Markdown";

const post1="# Sample blog post\n" +
    "\n" +
    "#### April 1, 2020 by [Olivier](/)\n" +
    "\n" +
    "This blog post shows a few different types of content that are supported and styled with\n" +
    "Material styles. Basic typography, images, and code are all supported.\n" +
    "You can extend these by modifying `Markdown.js`."
// const posts = [post1, post2, post3];
import MarkdownEditor from './MarkdownEditor'
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomizedTimeline from "./Comment";
import SpeedDials from "./Dial";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
const useStyles = theme => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
        marginLeft:20
    },
    title: {
        margin: theme.spacing(2, 2),
    },
})

class Blog extends React.Component{
//export default function Blog(props) {
    //const classes = useStyles();
    constructor(props) {
        super(props);
        this.state = {
            tags:[],

        };

    }
    componentDidMount(){
        this.getTagsByBlogId();

    }
    getTagsByBlogId(){
        // console.log(this.state.blogId)
        axios.get('/blog/tags?blogId='+this.props.blogData.id
            ,{


            })
            .then((body) => {
                console.log(body.data.data)
                this.setState({
                    tags:body.data.data
                })
            })
    }
    bindRef = ref => { this.MarkdownEditor = ref }
    render(){
    const  blogData  = this.props.blogData;
    const {classes} = this.props;
    const blogId=blogData.id
    console.log(blogId)
    return (
        // <Grid item xs={12} md={8}>
        //     <Typography variant="h6" gutterBottom>
        //         {title}
        //     </Typography>
        //     <Divider />
        //     {posts.map((post) => (
        //         <Markdown className={classes.markdown} key={post.substring(0, 40)}>
        //             {post}
        //         </Markdown>
        //     ))}
        // </Grid>
        <Grid xs={12}>
            <Paper elevation={5}>
                {/*<TextField*/}
                {/*    id="outlined-multiline-static"*/}
                {/*    label="Multiline"*/}
                {/*    multiline*/}
                {/*    rows={4}*/}
                {/*    defaultValue="Default Value"*/}
                {/*    variant="outlined"*/}
                {/*/>*/}

                {this.state.tags.map((tagData) =>(
                    <Chip
                        // avatar={<Avatar>M</Avatar>}
                        label={tagData.name}
                        clickable
                        color={tagData.color}
                        // onDelete={handleDelete}
                        // deleteIcon={<DoneIcon />}
                    />

                ))}
                {/*<Chip*/}
                {/*    avatar={<Avatar>M</Avatar>}*/}
                {/*    label="Primary clickable"*/}
                {/*    clickable*/}
                {/*    color="primary"*/}
                {/*    // onDelete={handleDelete}*/}
                {/*    // deleteIcon={<DoneIcon />}*/}
                {/*/>*/}
                <Typography variant="h3" gutterBottom className={classes.title}>
                    {blogData.title}
                </Typography>
                <Divider />
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {blogData.description}
                </Typography>

                <Divider />
                {/*<Typography>{post2}</Typography>*/}
                {/*<MarkdownEditor triggerRef={this.bindRef} />*/}
                {/*<Button onClick={()=>this.MarkdownEditor.PostMD()}>1</Button>*/}
                {/*{posts.map((post) => (*/}
                <Markdown className={classes.markdown}>
                    {/*{post1}*/}
                    {blogData.content}
                </Markdown>
                <Divider />
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {"此文章总共有"}{blogData.gradenum}{"人参与评分，平均分为："}{blogData.avggrade}
                </Typography>

                <CustomizedTimeline blogId={blogId}/>
                    {/*))}*/}

            </Paper>

        </Grid>
    );}
}
export default withStyles(useStyles)(Blog)