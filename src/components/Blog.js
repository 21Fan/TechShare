import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import Markdown from "./Markdown";
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md'
const posts = [post1, post2, post3];
import MarkdownEditor from './MarkdownEditor'
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
const useStyles = theme => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    title: {
        margin: theme.spacing(1, 1),
    },
})

class Blog extends React.Component{
//export default function Blog(props) {
    //const classes = useStyles();
    bindRef = ref => { this.MarkdownEditor = ref }
    render(){
    const  blogData  = this.props;
    const {classes} = this.props

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
        <Grid xs={11}>
            <Paper elevation={3}>
                {/*<TextField*/}
                {/*    id="outlined-multiline-static"*/}
                {/*    label="Multiline"*/}
                {/*    multiline*/}
                {/*    rows={4}*/}
                {/*    defaultValue="Default Value"*/}
                {/*    variant="outlined"*/}
                {/*/>*/}
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {blogData.title}
                </Typography>

                <Divider />
                <Typography>{post2}</Typography>
                <MarkdownEditor triggerRef={this.bindRef} />
                <Button onClick={()=>this.MarkdownEditor.PostMD()}>1</Button>
                {posts.map((post) => (
                <Markdown className={classes.markdown} key={blogData.id}>
                    {post}
                </Markdown>
                    ))}

            </Paper>

        </Grid>
    );}
}
export default withStyles(useStyles)(Blog)