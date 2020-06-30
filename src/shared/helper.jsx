import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../redux/user/user-actions';
import { setPosts } from '../redux/posts/posts-actions';
import { database } from '../firebase/firebase.utils';

let posts = [];
class Helper extends React.Component {

    constructor(props) {
        super(props);
        this.getUserData();
        this.getPosts();
    }

    state = {
        allPosts: [],
        postsArrived: false,
        userInfo: null
    };

    getUserData = () => {
        let currentUserId = localStorage.getItem('currentUserId')
        if (currentUserId) {

            let userData = database.collection('users').doc(currentUserId);
            userData.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        let data = doc.data()
                        if (data.password) data.password = "[hidden]"
                        let info = JSON.stringify(data)
                        localStorage.setItem('currentUserInfo', info)
                        this.setState({ userInfo: doc.data() })
                        this.props.setUser(info)
                        //console.log('Document data:', doc.data());
                    }
                })
                .catch(err => {
                    // console.log('Error getting document', err);
                });
        }
    }

    getPosts = () => {
        let postsData = database.collection('posts')
        let query = postsData.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    var a = doc.data()
                    a.id = doc.id
                    posts.push(a)
                });

                posts.sort((a, b) => (a.timeStamp > b.timeStamp) ? -1 : 1);
                this.props.setPosts(posts)
                posts = [];
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
    render() {
        return (<div></div>)
    }
}






const mapDispatchToProps = dispatch => ({
    setPosts: posts => dispatch(setPosts(posts)),
    setUser: user => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(Helper);