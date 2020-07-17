import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetMeta = ({
  title,
  origin = window ? window.location.origin : "https://backgammon.siteless.co",
  pathname = "/",
  description,
  primaryData,
  secondaryData,
}) => {
  title = title === undefined ? "Backgammon" : `${title} | Backgammon`;
  const url = origin + pathname;

  return (
    <Helmet>
      {!!title && [
        <title key="title">{title}</title>,
        <meta key="og:title" property="og:title" content={title} />,
        <meta key="twitter:title" name="twitter:title" value={title} />,
      ]}

      {!!url && [
        <meta key="og:url" property="og:url" content={url} />,
        <meta key="twitter:url" name="twitter:url" value={url} />,
      ]}

      {!!description && [
        <meta key="description" name="description" content={description} />,
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />,
        <meta
          key="twitter:description"
          name="twitter:description"
          value={description}
        />,
      ]}

      {primaryData && [
        <meta
          key="twitter:label1"
          name="twitter:label1"
          value={primaryData.title}
        />,
        <meta
          key="twitter:data1"
          name="twitter:data1"
          value={primaryData.data}
        />,
      ]}

      {secondaryData && [
        <meta
          key="twitter:label2"
          name="twitter:label2"
          value={secondaryData.title}
        />,
        <meta
          key="twitter:data2"
          name="twitter:data2"
          value={secondaryData.data}
        />,
      ]}
    </Helmet>
  );
};

export default HelmetMeta;
