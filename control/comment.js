 var data = [ {author: "Pete Hunt", text: "This is one comment"}, {author: "Checccy", text: "This is another comment"} ];
         var CommnetBox=React.createClass({
            getInitialState:function () {
                return{data: [ {author: "Pete Hunt", text: "This is one comment"}, {author: "Checccy", text: "This is another comment"} ]}
            },
            handleCommentSubmit:function (comment) {
                var data=this.state.data;
                data.push(comment);
                //this.state.data.push(comment);
                this.setState({data:data});
            },
            componentDidMount:function () {
/*              $.ajax({
                    url:this.props.url,
                    dataType:'json',
                    cache:false,
                    success:function (data) {
                        this.setState({data:data})
                    }.bind(this),
                    error:function (xhr,status,err) {
                        console.log(this.props.url,status,err.toString());
                    }.bind(this)
                })*/
            },
            render:function () { 
                return(
                <div className="commentBox">
                    <h1>Comments</h1>
                    <CommentList data={this.state.data} />
                    <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                </div>
                     ) 
            } 
            }); 
        var Comment = React.createClass({ 
            render: function() { 
                return (
                    <div className="comment">
                        <h2 className="commentAuthor">
                           {this.props.author}
                        </h2>
                        {this.props.children}
                    </div>
        ); } }); 
        var CommentList=React.createClass({
                render:function () { 
                    var comments=this.props.data.map(function (comment) {
                        return(
                            <Comment author={comment.author}>
                            {comment.text}
                            </Comment>
                            )
                    })
                    return(
                    <div className="commentList">
                        {comments}
                    </div>
            )
             } })
         var CommentForm=React.createClass({
            getInitialState:function () {
                return {author:'',text:''}
            },
            handleInputOnChange:function (name,event) {
                var newState={};
                newState[name]=event.target.value;
                this.setState(newState);
            },
            handleSubmit:function (e) {
                e.preventDefault();
                if (!this.state.author||!this.state.text) {
                    return;
                }
                this.props.onCommentSubmit(this.state)
                return;
            },
            render:function () { 
                return(
                    <div className="commentForm">
                   <form className="commentForm" onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Your name"  value={this.state.author} onChange={this.handleInputOnChange.bind(this,'author')}/>
                            <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleInputOnChange.bind(this,'text')}/>
                            <input type="submit" value="Post" />
                   </form>
                    </div>)
         } 
            });
         ReactDOM.render(
        <CommnetBox data={data} />,document.getElementById('container'));
