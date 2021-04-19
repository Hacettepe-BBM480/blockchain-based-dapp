import File from "./File";

import React, { Component } from "react";

export default class FileList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map((array, index) => {
          return (
            <File
              key={index}
              index={index}
              fileId={array[0]}
              fileHash={array[1]}
              fileSize={array[2]}
              fileExtension={array[3]}
              fileName={array[4]}
              fileDescription={array[5]}
              fileTime={array[6]}
            />
          );
        })}
      </div>
    );
  }
}
