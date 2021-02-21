import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,

    },
    media: {
        height: 0,
        //paddingTop: '56.25%', // 16:9=56.25%
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const { post } = props;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item xs={11} >

            <Card elevation={5} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={post.title}
                    subheader={post.date}
                />
                <Tooltip title="More">
                    <CardActionArea onClick={handleExpandClick}>

                        <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/paella.jpg"
                            image={post.image}
                            title={post.imageText}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.description}
                            </Typography>
                        </CardContent>

                    </CardActionArea>
                </Tooltip>
                <CardActions disableSpacing>
                    <Tooltip title="Favorite">
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="More">
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />

                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                            again without stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

        </Grid>
    );
}
