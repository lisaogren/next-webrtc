import React from 'react'

export default (props) => {
  const { name, ...rest } = props

  return (
    <span className='icon-component'>
      <i className={`fa fa-${name}`} {...rest} />
      <style jsx>{`
        .icon-component {
          width: auto;
          height: auto;

          i.fa {
            color: #eee;
            font-size: ${props.fontSize || 'auto'};
          }
        }
      `}</style>
    </span>
  )
}
