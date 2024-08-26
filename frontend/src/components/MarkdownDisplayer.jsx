import React from 'react'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import classes from './css/MarkdownDisplayer.module.css'

function MarkdownDisplayer({ textMd }) {
  
  const markdown = 
`
This ~is not~ strikethrough, but ~~this is~~!

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

# Foobar

Foobar is a Python library for dealing with word pluralization.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

## Usage

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla similique unde assumenda rerum nobis eveniet ipsa? Illo delectus nesciunt iusto porro adipisci at tempora rem. Aliquam officiis a repudiandae.
### Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla similique unde assumenda rerum nobis eveniet ipsa? Illo delectus nesciunt iusto porro adipisci at tempora rem. Aliquam officiis a repudiandae.
# Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla similique unde assumenda rerum nobis eveniet ipsa? Illo delectus nesciunt iusto porro adipisci at tempora rem. Aliquam officiis a repudiandae.
`
  return (<div className={classes.markdownContainer}>
    <Markdown 
    remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
    >
      {textMd}
    </Markdown>
  </div>)
}

export default MarkdownDisplayer