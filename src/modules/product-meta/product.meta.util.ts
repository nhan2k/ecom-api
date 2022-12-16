class ProductMetaUtil {
  public convertContent(content: string | Array<string>) {
    if (typeof content === 'string') {
      return content.split(',').toString();
    }

    if (Array.isArray(content)) {
      content.join(',');
    }

    throw new Error('Content not valid');
  }
}

export default ProductMetaUtil;
