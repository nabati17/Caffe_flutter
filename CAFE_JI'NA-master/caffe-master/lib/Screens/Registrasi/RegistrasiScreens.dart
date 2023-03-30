import 'package:flutter/material.dart';
import 'package:logins_screen/utils/constants.dart';

import '../../../size_config.dart';
import '../../Components/Registrasi/RegistrasiComponent.dart';

class RegistrasiScreen extends StatelessWidget {
  static String routeName = "/sign_up";
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
      ),
      body: RegistrasiComponent(),
    );
  }
}
