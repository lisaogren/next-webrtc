import { Component } from 'react'
import classNames from 'classnames'

class Video extends Component {
  video = null

  render () {
    const { mine = false, ...props } = this.props
    const classes = classNames({
      'my-video': mine,
      'their-video': !mine
    })

    return (
      <video className={classes} ref={this.setVideo} autoPlay {...props}>
        <style jsx>{`
          .my-video {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 200px;
            border: white solid 1px;
            border-width: 1px 0 0 1px;
            z-index: 10;
          }

          .their-video {
            max-width: 100%;
            max-height: 100%;
          }
        `}</style>
      </video>
    )
  }

  setVideo = (el) => {
    this.video = el
  }
}

export { Video }
export default Video
