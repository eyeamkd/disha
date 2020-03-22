import React, { Component, Fragment } from "react";
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import { Container, Col, Row } from "react-bootstrap";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    LivejournalIcon,
    WhatsappIcon,
  } from "react-share";

export default class SharePost extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        open:false
    }

    handleClick = () => {
        this.setState({
            open:true
        })
    }

    handleClose = () => {
        this.setState({
            open:false
        })
    }


    render() {
        return(
            <Container>
                <Row>
                    <Tooltip title="Copy">
                        <Col onClick={this.handleClick}>
                            <Link>
                            <CopyToClipboard text={this.props.url} onCopy={() => this.setState({copied: true})}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                            </CopyToClipboard>
                            </Link>
                        </Col>
                    </Tooltip>
                    <Snackbar 
                        open={this.state.open} 
                        autoHideDuration={1000} 
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}

                    >
                        <Alert elevation={6} onClose={this.handleClose} severity="success">
                            Copied!
                        </Alert>
                    </Snackbar>
                    <Tooltip title="Whatsapp"><Col><WhatsappShareButton url={this.props.url} children={<WhatsappIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Telegram"><Col><TelegramShareButton url={this.props.url} children={<TelegramIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Reddit"><Col><RedditShareButton url={this.props.url} children={<RedditIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Facebook Messenger"><Col><FacebookMessengerShareButton url={this.props.url} children={<FacebookMessengerIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Twitter"><Col><TwitterShareButton url={this.props.url} children={<TwitterIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Facebook"><Col><FacebookShareButton url={this.props.url} children={<FacebookIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Linkedin"><Col><LinkedinShareButton url={this.props.url} children={<LinkedinIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Email"><Col><EmailShareButton url={this.props.url} children={<EmailIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Tooltip title="Tumblr"><Col><TumblrShareButton url={this.props.url} children={<TumblrIcon size={32} round={true}/>} /></Col></Tooltip>
                    <Col md={4}></Col>
                </Row>
            </Container>
        )
    }
}