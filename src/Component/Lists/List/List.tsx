import React from "react";
import { Row, Col } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import "./List.css";

const List = (props: any) => {
  return (
    <div>
      <Row className={"mainList"}>
        <Col span={6} flex={4}>
          <div className={"img"}>
            <img src={props.img} alt="Unavailable" />
          </div>
        </Col>
        <Col span={4} className={"imgCol"}>
          <p className={"name"}>
            {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          </p>
          <span className={"order"}> #{props.order}</span>
        </Col>
        <Col span={10} className={"typeCol"}>
          {props.types.map((type: any) => {
            return (
              <span className={"type"} key={Math.random().toString(36)}>
                {type.type.name.toUpperCase()}
              </span>
            );
          })}
        </Col>
        <Col span={4} className={"delCol"}>
          <CloseCircleFilled
            style={{ fontSize: "16px" }}
            onClick={props.click}
          />
        </Col>
      </Row>
    </div>
  );
};

export default List;
