function toFile(data, name) {
    if (data instanceof File) return data;
    if (data instanceof Blob) {
        data.name = name;
        return data;
    }
    return new File([JSON.stringify(data)], name);
}

export { toFile };
