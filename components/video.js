import { Component } from 'react'

class Video extends Component {
  constructor (props) {
    super(props)

    this.video = null
  }

  render () {
    const { src } = this.props

    return (
      <video src={src} ref={this.setVideo} autoPlay />
    )
  }

  setVideo = (el) => {
    this.video = el
  }

  play = () => {
    this.video.play()
  }
}

export { Video }
export default Video
