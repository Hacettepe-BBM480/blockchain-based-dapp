import React, { Component } from "react";
import { ArrowUpRight } from "react-bootstrap-icons";

export default class File extends Component {

  render() {
    const {
      index,
      fileId,
      fileHash,
      fileSize,
      fileExtension,
      fileName,
      fileDescription,
      fileTime,
    } = this.props;

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(fileTime * 1000);

    return (
      <div className="accordion mb-3" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header bg-dark" id={"flush-heading" + index}>
            <button
              className="accordion-button collapsed bg-secondary"
              style={{ color: "white" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#flush-collapse" + index}
              aria-expanded="false"
              aria-controls={"flush-collapse" + index}
            >
              {fileName + "." + fileExtension}
            </button>
          </h2>
          <div
            id={"flush-collapse" + index}
            className={
              "accordion-collapse collapse" + (index === 0 ? " show" : "")
            }
            aria-labelledby={"flush-heading" + index}
          >
            <div className="accordion-body">
              <div>
                <div className="mb-3 row">
                  <label
                    className="col-sm-2 col-form-label"
                  >
                    File ID
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      defaultValue={fileId}
                    />
                  </div>
                  <label
                    className="col-sm-2 offset-1 col-form-label"
                  >
                    <div className=" float-end">File Size</div>
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      defaultValue={fileSize + "KB"}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-2">
                    Upload Time
                  </label>
                  <div className="col-10">
                    <input
                      className="form-control"
                      type="text"
                      aria-label="readonly input example"
                      readOnly
                      value={date}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: 100 }}
                        defaultValue={fileDescription}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-2">
                    File Hash
                  </label>
                  <div className="col-9">
                    <input
                      className="form-control col-10"
                      type="text"
                      aria-label="readonly input example"
                      readOnly
                      value={fileHash}
                    />
                  </div>
                  <div className="col-1">
                    <a href={"https://ipfs.infura.io/ipfs/"+ this.props.fileHash}>
                      <button
                        type="button"
                        className="btn btn-dark"
                      >
                        <ArrowUpRight />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="accordion-item">
          <h2 className="accordion-header" id={fileContent[0]}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#" + fileContent[0]}
            >
              {fileName}
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              first item's accordion body.
            </div>
          </div>

          <div id={fileContent[0]} className="accordion-collapse collapse">
            <div className="accordion-body">{fileContent}</div>
          </div> 
        </div> */}
      </div>
    );
  }
}
