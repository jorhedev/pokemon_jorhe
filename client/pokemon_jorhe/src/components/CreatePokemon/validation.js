export function validateName(name) {
  if (!name) {
    return "Enter a name";
  }

  if (name.length > 20) {
    return "It cannot be longer than 20 characters";
  }

  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    return "Please enter a valid name";
  }

  return null;
}

export function validateImage(image) {
  if (!image) {
    return "Enter a URL Image";
  }

  const imageRegex = /^https?:\/\/.+\.((jpg|jpeg|png|webp|avif|gif|svg)(\?.+)?)$/;
  if (!imageRegex.test(image)) {
    return "Please enter a valid URL image";
  }

  return null;
}

export function valHp(hp) {
  if (!hp) {
    return "Please enter HP";
  }

  if (hp <= 0) {
    return "Only HP positive";
  }

  return null;
}

export function valAttack(attack) {
  if (!attack) {
    return "Please enter Attack";
  }

  if (attack <= 0) {
    return "Only Attack positive";
  }

  return null;
}


export function valDefense(defense) {
if (!defense) {
    return "Please enter Defense";
}

  if (defense <= 0) {
    return "Only Defense positive";
}

  return null;
}

export function valSpeed(speed) {
  if (speed < 0) {
    return "Only Speed positive";
}

  return null;
}

export function valHeight(height) {
  if (height < 0) {
    return "Only Height positive";
}

  return null;
}

export function valWeight(weight) {
  if (weight < 0) {
    return "Only Weight positive";
}

  return null;
}

