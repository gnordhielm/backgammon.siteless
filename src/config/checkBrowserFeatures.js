const checkBrowserFeatures = () => {
  if (!CSS.supports('color', 'var(--fake-var)'))
    window.alert(
      'Your browser does not support a key styling feature this app relies on. For the best experience, please use the most current version of your browser. We do not support Internet Explorer.',
    )
}

export default checkBrowserFeatures
